const mongoose = require('mongoose')
const bookSchema = mongoose.Schema(
  {
    name:{type: String, required: true, unique: true },
    price:{type: String, required: true},
    rate:{type: String},
    author:{type: String, required: true},
    typeBook:{ type:[String] },
    part:{ type:[String] },
    publishDate:{ type: Date },
    publisher:{ type: String },
    language:{ type: String, default:'vietnamese' },
    pageNumber:{ type: Number, default: 0},
    description:{ type: String },
    category:{
      type: String,
      enum: ['romance', 'horror', 'children','mystery','travel','cookbook','thriller', 'other'],
      default: 'other'
    },
    thumbnail:{type: String}
  },
  { timestamps: true }
)
const Book = mongoose.model('Book',bookSchema);
module.exports = Book;