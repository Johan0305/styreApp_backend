const { Schema, model, models } = require("mongoose");

const walletSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    income: {
      type: Number,
      require: true,
    },
    color: {
      type: String,
    },
    expenses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Expense",
        },
      ],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = model("Wallet", walletSchema);

module.exports = Wallet;
