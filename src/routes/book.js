const express = require('express')
const router = express.Router()

const {getAllBooks, getBookById, createBook, updateBook, deleteBook,getBookByCategory} = require('../services/Bookservice')

router.get('/', getAllBooks)
router.get('/categories/:category',getBookByCategory)
router.get('/:id', getBookById)
router.put('/', createBook) // post
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router