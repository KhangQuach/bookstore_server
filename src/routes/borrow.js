const express = require('express')
const router = express.Router()
const { createBorrowedBook, getBorrowedByUserId} = require('../services/Borrowservice.js')


router.post('/', createBorrowedBook);
router.get('/:userId', getBorrowedByUserId);
module.exports = router