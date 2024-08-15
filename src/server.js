require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/user.js')

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cors
app.use(cors())
//routes
app.use('/', authRouter)
app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('Connected!'));