const Cart = require("../models/cart.modal.js")
const Book = require("../models/book.modal.js")

const addBook = async (req, res) => {
  const userId = req.params["id"]
  const bookId = req.body.bookId
  try{
    console.log(`Book ${bookId}`)
    console.log(`User ${userId}`)
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const cart = await Cart.findOne({userId: userId})
    if (!cart) {
      cart = new Cart({
        userId: userId,
        cartItems: [bookId]
      });
    } else {
      if (cart.cartItems.includes(bookId)) {
        res.json({message: 'Book already in the cart'})
      }
      cart.cartItems.push(bookId);
    }
    await cart.save();
    res.json({cart})
  }
  catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {addBook}
