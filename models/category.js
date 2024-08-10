const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "https://image.example.com ",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
