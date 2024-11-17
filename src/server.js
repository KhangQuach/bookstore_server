require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const bookRouter = require('./routes/book.js')
const searchRouter = require('./routes/search.js')
const cartRouter = require('./routes/cart.js')
const borrowRouter = require('./routes/borrow.js')
const publisherRouter = require('./routes/publisher.js')
const port = process.env.PORT || 3000
const app = express()
//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cors
app.use(cors())
//routes
app.use('/', authRouter)
app.use('/search', searchRouter)
app.use('/user',userRouter)
app.use('/book',bookRouter)
app.use('/cart',cartRouter)
app.use('/borrow',borrowRouter)
app.use('/publisher',publisherRouter)
//multer
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
app.post('/upload', upload.single('file'), function (req, res) {
  res.json(req.file)
})
//MongoDB connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));