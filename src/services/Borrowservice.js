
const BorrowedBook = require('../models/borrow.modal.js');
const User = require('../models/user.modal.js')
const Book = require('../models/book.modal.js')
const createBorrowedBook = async (req, res) => {
  try {
    const { userId, bookId, part, type, returnDate } = req.body
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const borrowedBook = new BorrowedBook({
        userId,
        bookId,
        part,
        type,
        returnDate
    })
    await borrowedBook.save()
    res.status(201).json({ message: 'Book borrowed successfully', borrowedBook })
  } catch (error) {
      res.status(500).json({ message: 'Error borrowing the book', error })
  }
}

const getBorrowedByUserId = async (req, res) => {
  try {
    const userId = req.params.userId
    const borrowedBooks = await BorrowedBook.find({ userId }).populate("bookId")
    if (borrowedBooks.length === 0) {
        return res.status(404).json({ message: 'No borrowed books found for this user' })
    }
    res.status(200).json(borrowedBooks)
  } catch (error) {
      res.status(500).json({ message: 'Error fetching borrowed books', error })
  }
}

module.exports = {createBorrowedBook, getBorrowedByUserId}

