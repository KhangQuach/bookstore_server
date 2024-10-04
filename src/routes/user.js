const express = require('express')
const {handleGetUser, handleUpdateUser, handleGetUserById, handleDeleteUser} = require('../services/USERservice')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/:id', handleGetUser)
router.patch('/:id', handleUpdateUser)
router.delete('/:id', handleDeleteUser)
module.exports = router