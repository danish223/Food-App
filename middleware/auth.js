const JWT = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      success: false,
      message: "No Token provided",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "No token provided",
    });
  }
  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = isAuth;
