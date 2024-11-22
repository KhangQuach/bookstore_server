
const BorrowedBook = require('../models/borrow.modal.js');
const User = require('../models/user.modal.js')
const Book = require('../models/book.modal.js')

const getAllBorrowedBook = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.find().populate({ path: "userId", select: "username" }).populate("bookId")
    res.status(200).json(borrowedBooks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching borrowed books', error })
  }
}
const createBorrowedBook = async (req, res) => {
  try {
    const { userId, bookId, part, type, returnDate, username, bookname } = req.body
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({success:false, message: 'User not found' });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({success:false, message: 'Book not found' });
    }
    const borrowedBook = new BorrowedBook({
        userId,
        bookId,
        part,
        type,
        returnDate,
        username,
        bookname
    })
    await borrowedBook.save()
    res.status(201).json({success:true, message: 'Book borrowed successfully', borrowedBook })
  } catch (error) {
      res.status(500).json({success:false, message: 'Error borrowing the book', error })
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

const deleteBorrowedBook = async (req, res) => {
  try {
    const borrowedBookId = req.params.borrowedId
    const deletedBorrowedBook = await BorrowedBook.findByIdAndDelete(borrowedBookId)
    if (!deletedBorrowedBook) {
      return res.status(404).json({success:false, message: 'Borrowed book not found' });
    }
    res.status(200).json({success:true, message: 'Borrowed book deleted successfully' })
  } catch (error) {
    res.status(500).json({success:false, message: 'Error deleting borrowed book', error })
  }
}
const getNumberOfBorrowedBook = async (req, res) => {
  try {
    const userId = req.params.userId
    const borrowedBooks = await BorrowedBook.countDocuments({ userId })
    const totalPending = await BorrowedBook.countDocuments({userId, status:"pending" })
    const totalSuccess = await BorrowedBook.countDocuments({userId, status:"success" })
    const totalDeny = await BorrowedBook.countDocuments({userId, status:"deny" })
    const totalExpired = await BorrowedBook.countDocuments({userId, status:"expired"})
    res.status(200).json({success:true,borrowedBooks,totalPending,totalSuccess,totalDeny,totalExpired})
  } catch (error) {
    res.status(500).json({success:false, message: 'Error counting borrowed books', error })
  }
}

const updateStatus = async (req, res) => {
  try {
    const borrowedBookId = req.params.borrowedId;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const borrowedBook = await BorrowedBook.findById(borrowedBookId);
    if (!borrowedBook) {
      return res.status(404).json({ success: false, message: 'Borrowed book not found' });
    }
    if (borrowedBook.status === 'success') {
      return res.json({ success: false,status:"success", message: 'Borrowed book is already in "success" state' });
    }

    borrowedBook.status = status;
    await borrowedBook.save();

    res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      borrowedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating status',
      error: error.message || error,
    });
  }
}

const getCountBookByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const count = await BorrowedBook.countDocuments({ status });
    res.status(200).json({ success: true, count, status });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error counting books by status', error });
  }
 
}
module.exports = {createBorrowedBook, getBorrowedByUserId, deleteBorrowedBook, getNumberOfBorrowedBook, getAllBorrowedBook, updateStatus, getCountBookByStatus}

