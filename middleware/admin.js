const User = require("../models/user");

module.exports = async (req, res, next) => {
  const userId = req.body.id || req.params.id;
  console.log("User ID:", userId);

  if (!userId) {
    return res.status(400).send({
      success: false,
      message: "User ID not provided",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found in the database.");
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      err,
    });
  }
};
