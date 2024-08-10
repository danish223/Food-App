const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All fields",
      });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Alreadyy Registered please Login",
      });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashedPw,
      address,
      phone,
      answer,
    });
    return res.status(201).send({
      success: true,
      message: "Successfully Registered! ",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Register Api",
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email Or Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not found",
      });
    }
    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error In Login Api",
      err,
    });
  }
};
