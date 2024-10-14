const User = require('../models/user.modal.js')
const Cart = require('../models/cart.modal.js')

const handleCountUsersByRole = async function(req, res) {
  try {
    const userRole = req.params["role"];
    const userCountByRole = await User.countDocuments({ role: userRole });
    
    res.json({ role: userRole, count: userCountByRole });
  } catch (error) {
    res.status(500).json({ message: 'Error counting users by role', error: error.message });
  }
}
const handleCountUsers = async function(req, res) {
  try{
    const result = await User.countDocuments({})
    res.json({message: 'User count', count: result})
  }
  catch(e){
    console.log(e)
    res.json({message: 'Cant count users', success: false})
  }
}
const handleCreateUser = async (req, res) =>{
  try{
    const {
      username, password, email,
      fullname ,role, phone,
      birthday, age,gender,
      address1, address2, address3
    } = req.body
    
    const result = await User.create({
      username, password, email,
      fullname ,role, phone,
      birthday, age,gender,
      address1, address2, address3
    })
    if(!result){
      return res.status(404).json({message: 'User not found'})
    }
    const cart = await Cart.create({userId: result._id, cartItem:[]})
    res.status(200).json({message:'Created user',success:true, result})
  }
  catch(e){
    console.log(e)
    res.json({message: 'Cant create user', success: false})
  }
}

const handleGetUser = async (req, res) => {
  try{
    const id = req.params['id']
    if(!id) {
       return res.status(404).json({message: 'id is required'})
    }
    const result = await User.findById(id)
    if(!result){
      return res.status(404).json({message: 'User not found'})
    }

    res.json(result)
  }
  catch(e){
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
}
const handleGetAllUsers = async (req, res) => {
  try{
    const result = await User.find()
    res.json(result)
  }
  catch(e){
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
}
const handleUpdateUser = async (req, res) => {
  try{
  const id = req.params['id']
  if(!id){
      return res.status(404).json({message: 'id is required'})
    }
    const {username, password, email, fullname, role ,phone, birthday, age,gender , address1, address2, address3, description} = req.body
    const update = {
      username: username,
      password: password,
      email:email,
      fullname: fullname,
      gender: gender,
      role :role,
      phone: phone,
      birthday: birthday,
      age: age,
      address1: address1 ,
      address2: address2,
      address3: address3,
      description: description
    }
    const result = await User.findByIdAndUpdate(id, update)
    if(!result){
      return res.status(404).json({message: 'User not found',success: false})
    }
    res.json({result, success:true})
  }
  catch(e){
    console.log(e)
    res.status(500).json({message: 'Data existed',success: false})
  }
}

const handleDeleteUser = async (req, res) => {
  try{
    const id = req.params['id']
    if(!id) {
       return res.status(404).json({message: 'id is required'})
    }
    const deletedUser = await User.findByIdAndDelete(id)
    if(!deletedUser){
      return res.status(404).json({message: 'User not found'})
    }
    const deletedCart = await Cart.findOneAndDelete({userId: id})
    if(!deletedCart){
      return res.status(404).json({message: 'Cart not found'})
    }
    res.json({message: `user ${id} has been deleted`})
  }
  catch(e){
    console.log(e)
    res.status(500).json({message: 'Server Error'})
  }
}
module.exports = { handleGetUser, handleUpdateUser, handleDeleteUser, handleGetAllUsers, handleCreateUser, handleCountUsers, handleCountUsersByRole}