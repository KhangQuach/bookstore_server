const express = require('express')
const {handleGetUser, handleUpdateUser, handleDeleteUser, handleGetAllUsers, handleCreateUser, handleCountUsers, handleCountUsersByRole} = require('../services/USERservice')
const verifyToken = require('../middleware/auth')
const router = express.Router()

router.get('/', handleGetAllUsers)
router.get('/count',handleCountUsers)
router.get('/countByRole/:role',handleCountUsersByRole)
router.get('/:id', handleGetUser)
router.post('/', handleCreateUser)
router.patch('/:id', handleUpdateUser)
router.delete('/:id', handleDeleteUser)
module.exports = router