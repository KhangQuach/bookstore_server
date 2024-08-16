const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader.split(' ')[1]
  if(!token) return res.status(401)
  try{
    const decoded = jwt.verify(token, process.env.USER_SIGNATURE)
    console.log(decoded)
    next()
  }
  catch(e){
    return res.status(403).json({message: 'Invalid token', access: false})
  }
}

module.exports = verifyToken