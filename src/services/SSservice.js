const User = require('../models/user.modal.js')


const handleLogin = async (req, res) => {
    try{
      const {username, password} = req.headers
      const user = await User.findOne({username})
      if(!user){
        return res.status(404).json({message: 'User not found'})
      }
  
      if(user.password === password){
        res.json({message:'Login success', success: true})
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
        res.send(result)
      }else{
        res.status(400).json({'message': 'username, password or email are required'})
      }
    }catch(e){
      console.log(e)
      res.status(500).json({message: 'Server Error'})
    }
}
module.exports = {handleLogin, handleSignUp}