const express = require('express')
const {handleGetUser, handleUpdateUser} = require('../services/USERservice')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/:username', handleGetUser)
router.patch('/:username', handleUpdateUser)

module.exports = router