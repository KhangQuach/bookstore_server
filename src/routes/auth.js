const express = require('express')
const {handleLogin, handleSignUp} = require('../services/Authservice')
const verifyToken = require('../middleware/auth.js')
const router = express.Router()

router.post('/login', handleLogin)
router.post('/signup', handleSignUp)
router.get('/home/test', verifyToken,(req, res) => {
  res.json({message: 'Test route'})
})

module.exports = router