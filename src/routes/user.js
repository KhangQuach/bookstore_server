const express = require('express')
const {handleGetUser, handleUpdateUser, handleDeleteUser, handleGetAllUsers, handleCreateUser} = require('../services/USERservice')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/', handleGetAllUsers)
router.get('/:id', handleGetUser)
router.post('/', handleCreateUser)
router.patch('/:id', handleUpdateUser)
router.delete('/:id', handleDeleteUser)
module.exports = router