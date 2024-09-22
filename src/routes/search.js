const express = require('express')
const router = express.Router()
const { searchBook } = require('../services/Searchservice')

router.get('/', searchBook)

module.exports = router