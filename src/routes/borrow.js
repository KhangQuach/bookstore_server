const express = require('express')
const router = express.Router()
const { createBorrowedBook, getBorrowedByUserId, deleteBorrowedBook, getNumberOfBorrowedBook, getAllBorrowedBook, updateStatus } = require('../services/Borrowservice.js')


router.post('/', createBorrowedBook);
router.get('/:userId', getBorrowedByUserId);
router.delete('/:borrowedId', deleteBorrowedBook)
router.get('/count/:userId',getNumberOfBorrowedBook)
router.get('/', getAllBorrowedBook)
router.patch('/update-status/:borrowedId', updateStatus)
module.exports = router