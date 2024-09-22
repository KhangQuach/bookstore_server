const Book = require('../models/book.modal.js')

const searchBook = async (req, res) => {
  console.log(req.query.bookName)
  try{
    const data = await Book.find({
      "$or": [
        {name: {$regex: req.query.bookName}},
        {author: {$regex: req.query.bookName}},
        {category: {$regex: req.query.bookName}},
        {publisher: {$regex: req.query.bookName}}
      ]
    })
    res.json({data})
  }
  catch(err){
    console.error(err)
    res.status(500).send("Error in search book")
  }
}

module.exports = {searchBook}