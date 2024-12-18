
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    username: {type: String, required: true,unique:true},
    password: {type: String,required: true},
    email: {type: String,required: true, unique: true},
    fullname: {type: String},
    phone:{type: String},
    gender:{type: String, default:'male'},
    birthday:{type: Date},
    age:{type: Number,default: 0},
    address1:{type: String},
    address2:{type: String},
    address3:{type: String},
    role: {type: String, default: 'user'},
    description: {type: String},
    avatar: {type: String}
  },
  { timestamps: true }
)
const User = mongoose.model('User',UserSchema);
module.exports = User;