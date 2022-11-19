const router = require("express").Router();
const User = require("../services/user");
const userService = new User();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");

router.post("/signup", async (req, res) => {
  // Validation of username and password
  const { error, value } = Joi.object({
    username: Joi.string().min(5).max(32).required(),
    password: Joi.string().min(5).max(256).required(),
  }).validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const userId = await userService.addUser(value.username, value.password); // New User should be added to the database by service
    return res
      .status(201)
      .send({ message: "User created successfully", userId });
  } catch (err) {
    console.log(
      `${new Date().toDateString()}  Error in user controller -> signup. Error message: ${
        err.message
      }`
    );
    return res.status(500).send("Internal server error occured");
  }
});

router.post("/login", async (req, res) => {
  const { error, value } = Joi.object({
    username: Joi.string().min(5).max(32).required(),
    password: Joi.string().min(5).max(256).required(),
  }).validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await userService.getUser(valu.username);
    if (!user.success) {
      return res.status(user.status).send(user.error);
    }
    if (bcrypt.compareSync(value.password, user.password)) {
      jwt.sign({ userId: user.userId }, config.secretKey, {
        expiresIn: config.expiresIn,
      });
    }
  } catch (err) {
    console.log(
      `${new Date().toDateString()}  Error in user controller -> login. Error message: ${
        err.message
      }`
    );
    return res.status(500).send("Internal server error occured");
  }
});

module.exports = router;
