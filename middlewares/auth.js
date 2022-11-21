const jwt = require("jsonwebtoken");
const config = require("../config");

async function auth(req, res, next) {
  try {
    let decoded = jwt.verify(req.header.accessToken, config.secretKey);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).send({ success: false, error: error.message });
  }
}

module.exports = auth;
