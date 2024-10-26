const mongoose = require('mongoose')
const BorrowedBookSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book',required: true},
    part: { type: Number},
    type: {type: String},
    status: {type: String, default: 'pending', enum: ['pending', 'success', 'deny', 'expired']},
    borrowDate: { type: Date, default: Date.now},
    returnDate: { 
      type: Date,
      default: function() {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date;
      },
      required: true 
    }
  }
)
const BorrowedBook = mongoose.model('BorrowedBook', BorrowedBookSchema);

module.exports = BorrowedBook;