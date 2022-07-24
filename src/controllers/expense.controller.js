const List = require("../models/list.model");
const Expense = require("../models/expense.model");
const Wallet = require("../models/wallet.model");
const User = require("../models/user.model");

module.exports = {
  async theExpenses(req, res) {
    try {
      const userId = req.user;
      const expenses = await Expense.find({ user: userId }).populate("wallet");
      res.status(200).json({ message: "expenses found", data: expenses });
    } catch (err) {
      res.status(400).json({ message: "Expenses could not be found" });
    }
  },

  async expense(req, res) {
    try {
      const { expenseId } = req.params;
      const expense = await Expense.findById(expenseId);
      res.status(200).json({ message: "expense found", data: expense });
    } catch (err) {
      res.status(200).json({ message: "expense could not be found" });
    }
  },

  async createExpense(req, res) {
    try {
      const { listId, walletId } = req.params;
      const userId = req.user;
      const expense = await Expense.create({
        ...req.body,
        list: listId,
        wallet: walletId,
        user: userId,
      });
      const list = await List.findById(listId);
      const wallet = await Wallet.findById(walletId);
      const user = await User.findById(userId);
      list.expenses.push(expense);
      wallet.expenses.push(expense);
      user.expenses.push(expense);
      list.save({ validateBeforeSave: false });
      wallet.save({ validateBeforeSave: false });
      user.save({ validateBeforeSave: false });
      res.status(201).json({
        message: "expense created",
        data: await expense.populate("wallet"),
      });
    } catch (err) {
      res.status(400).json({ message: "expense could not be created" });
    }
  },

  async updateExpense(req, res) {
    try {
      const { expenseId } = req.params;
      const expense = await Expense.findByIdAndUpdate(expenseId, req.body, {
        new: true,
      });
      res.status(200).json({
        message: "expense updated",
        data: await expense.populate("wallet"),
      });
    } catch (err) {
      res.status(400).json({ message: "expense could not be updated" });
    }
  },

  async deleteExpense(req, res) {
    try {
      const { expenseId } = req.params;
      const expense = await Expense.findByIdAndDelete(expenseId);
      res.status(200).json({ message: "expense deleted", data: expense });
    } catch (err) {
      res.status(400).json({ message: "expense could not be deleted" });
    }
  },
};
