require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')
const bookRouter = require('./routes/book.js')
const searchRouter = require('./routes/search.js')
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
//MongoDB connect
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));