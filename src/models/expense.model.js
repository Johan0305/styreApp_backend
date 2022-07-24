const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
      require: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
