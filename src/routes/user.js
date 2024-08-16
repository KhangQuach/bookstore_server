const express = require('express')
const {handleGetUser, handleUpdateUser} = require('../services/USERservice')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/getuser/:username', handleGetUser)
router.put('/updateuser/:username', handleUpdateUser)

module.exports = router