const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
    },
    age:{
      type: Number,
      required: true,
      default: 0
    },
    gpa:{
      type: Number,
      required: true,
      default: 0
    },
    fulltime:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamp: true
  }
)

const Student = mongoose.model("Student",StudentSchema);
module.exports = Student