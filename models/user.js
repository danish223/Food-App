const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  usertype: {
    type: String,
    required: [true, "User type is required"],
    default: "Client",
    enum: ["Client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
