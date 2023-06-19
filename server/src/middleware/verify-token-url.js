const jwt = require("jsonwebtoken");

const verifyTokenUrl = (req, res, next) => {
  const token = req.params.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    //decode token ==> id
    const decoded = jwt.verify(token, process.env.DB_ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};
module.exports = verifyTokenUrl;
