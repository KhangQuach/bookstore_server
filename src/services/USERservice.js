const User = require('../models/user.modal.js')
const Cart = require('../models/cart.modal.js')
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

const handleUpdateUser = async (req, res) => {
  try{
  const id = req.params['id']
  if(!id){
      return res.status(404).json({message: 'id is required'})
    }
    const {username, password, email, fullname, phone, birthday, age, address1, address2, address3} = req.body
    const update = {
      username: username,
      password: password,
      email:email,
      fullname: fullname,
      phone: phone,
      birthday: birthday,
      age: age,
      address1: address1 ,
      address2: address2,
      address3: address3 
    }
    const result = await User.findByIdAndUpdate(id, update)
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
module.exports = { handleGetUser, handleUpdateUser, handleDeleteUser}