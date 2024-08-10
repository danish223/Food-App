// controllers/user.js
const user = require("../models/user");
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const { login } = require("./auth");

exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Mask the password before sending the user object
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error: err.message, // Send only the error message to avoid exposing stack traces
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    user.save();

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Update User API",
      error: err.message,
    });
  }
};

exports.restPassword = async (req, res, next) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all the fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or Invalid Answer",
      });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashedPw = await bcrypt.hash(newPassword, salt);
    user.password = hashedPw;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in Password Rest API",
      err,
    });
  }
};


// Delete User 
exports.deleteUser = async (req, res, next ) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByIdAndDelete(userId);
        return res.status(200).send({
            success: true,
            message: 'Your Acc has been deleted',
            user
            
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error In Delete API',
            err
        })
    }
}