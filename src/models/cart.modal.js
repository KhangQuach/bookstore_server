const mongoose = require('mongoose')

const CartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  }
  
)
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart