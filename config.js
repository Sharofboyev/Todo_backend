require("dotenv").config();

module.exports = {
  appPort: process.env.APP_PORT,
  secretKey: process.env.SECRET_KEY,
  expiresIn: +process.env.TOKEN_EXPIRATION_IN_SECONDS,
};
