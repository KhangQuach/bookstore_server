const mongoose = require('mongoose')
const publisherSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true},
    address: { type: String, required: true}
  }
)
const Publisher = mongoose.model('BorrowedBook', publisherSchema);

module.exports = Publisher;