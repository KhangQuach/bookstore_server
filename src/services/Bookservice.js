const Book = require('../models/book.modal.js')

const getAllBooks = async (req, res) => {
  try{
    const result = await Book.find({})
    res.json(result)
  }
  catch(err){
    console.error(err)
    res.status(500).send("Cant get book")
  }
} 

const getBookByCategory = async (req, res) => {
  try{
    const {category} = req.params
    const result = await Book.find({category: category})
    res.json(result)
  }
  catch(err){
    console.error(err)
    res.status(500).send("Cant get category")
  }
}

const getBookById = async (req, res) => {
  const id = req.params["id"];
  if(!id){
    return res.status(404).json({message: 'ID is required'})
  }

  try{
    const result = await Book.findById(id);
    return res.json({message: "Book found", data :result})
  }
  catch(err){
    console.error(err)
    res.status(500).send("Cant get book by id")
  }
}



const createBook = async (req, res) => {
  const {
    name, price, rate,
    author, typeBook, part,
    publishDate ,publisher,
    language, pageNumber, description, category
  } = req.body

  try{
    const result = await Book.create({
      name, price, rate,
      author, typeBook, part,
      publishDate, publisher, language,
      pageNumber, description, category
    })
    res.json({result:result, message:'Created book', success: true})
  }
  catch(err){
    console.error(err)
    res.json({result:result, message: 'Cant create book', success: false})
  }
}

const updateBook = async (req, res) => {
  const { id } = req.params
  if(!id){
    return res.status(404).json({message: 'ID is required'})
  }
  try {
    const {
      name, price, rate,
      author, typeBook, part,
      publishDate ,publisher,
      language, pageNumber, description, category
    } = req.body

    const update = { 
      name, price, rate,
      author, typeBook, part,
      publishDate ,publisher,
      language, pageNumber, description, category
    }
    const result = await Book.findOneAndUpdate({_id: id}, update)
    if(!result) {
      return res.status(404).json({message: 'Book not found',id})  // return 404 if the book is not found in the database.
    }
    res.status(200).json({result: result, message:"Book updated successfully"})
  }
  catch(err){
    console.error(err)
    res.status(500).send("Cant update book!")  
  }
}

const deleteBook = async (req, res) => {
  const { id } = req.params
  if(!id){
    return res.status(404).json({message: 'ID is required'})
  }
  try {
    const result = await Book.deleteOne({_id: id})
    res.status(200).json({result: result, message:"Book deleted successfully"})  // success response with the deleted book object and a success message
  }
  catch(err) {
    console.error(err)
    res.status(500).send("Cant delete book!")
  }
}
module.exports = { getAllBooks,getBookByCategory , getBookById, createBook, updateBook, deleteBook }