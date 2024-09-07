const User = require('../models/user.modal.js')

const handleGetUser = async (req, res) => {
  try{
    const username = req.params['username']
    if(!username) {
       return res.status(404).json({message: 'username is required'})
    }
    const result = await User.findOne({ username: username})
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
  const filter = {username : req.params['username']}
  if(!filter){
      return res.status(404).json({message: 'username is required'})
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
    const result = await User.findOneAndUpdate(filter, update)
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
module.exports = { handleGetUser, handleUpdateUser}