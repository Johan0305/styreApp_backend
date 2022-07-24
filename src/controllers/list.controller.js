const List = require("../models/list.model");
const User = require("../models/user.model");

module.exports = {
  async theLists(req, res) {
    try {
      const userId = req.user;
      const lists = await List.find({ user: userId });
      res.status(200).json({ message: "lists founded", data: lists });
    } catch (err) {
      res.status(400).json({ message: "lists could not be found" });
    }
  },

  async list(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId);
      res.status(200).json({ message: "list found", data: list });
    } catch (err) {
      res.status(400).json({ message: "list could not be found" });
    }
  },

  async createList(req, res) {
    try {
      const userId = req.user;
      const list = await List.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.lists.push(list);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "list created", data: list });
    } catch (err) {
      res.status(400).json({ message: "list could not be created" });
    }
  },

  async updateList(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndUpdate(listId, req.body, {
        new: true,
      });
      res.status(200).json({
        message: "List updated",
        data: list,
      });
    } catch (err) {
      res.status(400).json({ message: "List could not be updated" });
    }
  },

  async deleteList(req, res) {
    try {
      const { listId } = req.params;
      const list = await List.findByIdAndDelete(listId);
      res.status(200).json({ message: "List deleted", data: list });
    } catch (err) {
      res.status(400).json({ message: "List could not be deleted" });
    }
  },
};
