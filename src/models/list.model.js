const { Schema, model } = require("mongoose");
const lettersRegex = new RegExp("[a-zA-Z]");

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
      match: [lettersRegex, "Invalid characters"],
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

const List = model("List", listSchema);

module.exports = List;
