const express = require('express')
const {handleLogin, handleSignUp} = require('../services/SSservice')
const router = express.Router()

router.post('/login',handleLogin)
router.post('/signup', handleSignUp)

module.exports = router