const mongoose = require('mongoose')
const authorSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
  }
)
const Author = mongoose.model('BorrowedBook', authorSchema);

module.exports = Author;