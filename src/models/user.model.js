const { Schema, model, models } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const passRegex = new RegExp("([0-9].{3,3})");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Email is not valid"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "This email already exists",
        },
      ],
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
    wallets: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Wallet",
        },
      ],
    },
    lists: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "List",
        },
      ],
    },
    expenses: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Expense",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
