const express = require('express')
const router = express.Router()

const {getAllBooks, getBookById, createBook, updateBook, deleteBook,getBookByCategory ,getCountBook ,getCountBookByCategory} = require('../services/Bookservice')

router.get('/', getAllBooks)
router.get('/count',getCountBook)
router.get('/countByCategory/:category',getCountBookByCategory)
router.get('/categories/:category',getBookByCategory)
router.get('/:id', getBookById)
router.post('/', createBook) // post
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router