const express = require('express')
const router = express.Router()
const { createBorrowedBook, getBorrowedByUserId, deleteBorrowedBook, getNumberOfBorrowedBook, getAllBorrowedBook } = require('../services/Borrowservice.js')


router.post('/', createBorrowedBook);
router.get('/:userId', getBorrowedByUserId);
router.delete('/:borrowedId', deleteBorrowedBook)
router.get('/count/:userId',getNumberOfBorrowedBook)
router.get('/', getAllBorrowedBook)
module.exports = router