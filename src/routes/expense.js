const router = require("express").Router();
const expenseController = require("../controllers/expense.controller");
const { auth } = require("../utils/auth");

router.route("/:listId/:walletId").post(auth, expenseController.createExpense);
router.route("/:expenseId").get(expenseController.expense);
router.route("/").get(auth, expenseController.theExpenses);
router.route("/:expenseId").put(expenseController.updateExpense);
router.route("/:expenseId").delete(expenseController.deleteExpense);

module.exports = router;
