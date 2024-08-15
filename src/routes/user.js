const express = require('express')
const {handleGetUser, handleUpdateUser} = require('../services/USERservice')
const router = express.Router()

router.get('/getuser/:username', handleGetUser)
router.put('/updateuser/:username', handleUpdateUser)

module.exports = router