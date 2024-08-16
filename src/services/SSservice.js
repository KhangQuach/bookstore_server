const User = require('../models/user.modal.js')
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try{
      const {username, password} = req.body
      const user = await User.findOne({username})
      if(!user){
        return res.json({message: 'User not found', success: false})
      }
      
      if(user.password === password){
        const accessToken = jwt.sign({ username: username, password: password}, process.env.USER_SIGNATURE);
        res.json({message:'Login success', success: true, token: accessToken});
      }else{
        res.json({message:'password incorrect',success: false})
      }
    }
    catch(e){
      console.log(e)
      res.status(500).json({message: 'Server Error'})
    }
  
}

const handleSignUp = async (req, res) => {
    try{
      const {email, username, password} = req.body
      if(email && username && password){
        const result = await User.create({email: email, username: username, password:password})
        const accessToken = jwt.sign({ username: username, password: password}, process.env.USER_SIGNATURE);
        res.json({message:'Signup success', success: true, token: accessToken})
      }else{
        res.status(400).json({'message': 'username, password or email are required'})
      }
    }catch(e){
      console.log(e)
      res.status(500).json({message: 'Server Error'})
    }
}
module.exports = {handleLogin, handleSignUp}