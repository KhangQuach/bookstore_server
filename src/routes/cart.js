const express = require('express')
const router = express.Router()
const  { addBook } = require('../services/Cartservice')

router.post('/:id', addBook)

module.exports = router