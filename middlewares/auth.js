const jwt = require("jsonwebtoken");
const config = require("../config");

async function auth(req, res, next) {
  const {accesstoken} = req.headers;
  if (!accesstoken)
    return res.status(401).send({success: false, error: "No token provided"});
  try {
    let decoded = jwt.verify(accesstoken, config.secretKey);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, error: "Invalid token" });
  }
}

module.exports = auth;
