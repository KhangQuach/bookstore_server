const Book = require('../models/book.modal.js')

const searchBook = async (req, res) => {
  console.log(req.query.bookName)
  try{
    const result = await Book.find({
      "$or": [
        {name: {$regex: req.query.bookName, $options: 'i'}},
        {author: {$regex: req.query.bookName, $options: 'i'}},
        {category: {$regex: req.query.bookName, $options: 'i'}},
        {publisher: {$regex: req.query.bookName, $options: 'i'}}
      ]
    })
    res.json(result)
  }
  catch(err){
    console.error(err)
    res.status(500).send("Error in search book")
  }
}

module.exports = {searchBook}