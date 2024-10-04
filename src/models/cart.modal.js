const mongoose = require('mongoose')
const BorrowedBookSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    part: { type: Number},
    type: {type: String},
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date, required: true }
  }
)
const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems:[BorrowedBookSchema],
  }
)
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart