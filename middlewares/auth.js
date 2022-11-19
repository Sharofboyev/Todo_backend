const router = require("express").Router();

async function auth(req, res, next) {
  // Token validation logic will be implemented in here
  return next();
}

module.exports = auth;
