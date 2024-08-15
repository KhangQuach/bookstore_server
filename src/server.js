require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const User = require('./models/user.modal.js')
const {handleLogin, handleSignUp} = require('./services/SSservice.js')
const app = express()
const port = 3000

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/login',handleLogin)
app.post('/signup', handleSignUp)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
mongoose.connect('mongodb://localhost:27017/bookstore')
  .then(() => console.log('Connected!'));