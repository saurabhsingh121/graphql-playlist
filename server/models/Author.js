const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
  books: Array,
});

module.exports = mongoose.model("Author", authorSchema);
