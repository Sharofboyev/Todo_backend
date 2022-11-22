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

  if (error)
    return res
      .status(400)
      .send({ success: false, error: error.details[0].message });

  try {
    const hashed = bcrypt.hashSync(value.password, 10);
    const userId = await userService.addUser(value.username, hashed); // New User should be added to the database by service

    return res.status(201).send({ success: true, userId });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error occured" });
  }
});

router.post("/login", async (req, res, next) => {
  const { error, value } = Joi.object({
    username: Joi.string().min(5).max(32).required(),
    password: Joi.string().min(5).max(256).required(),
  }).validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, error: error.details[0].message });

  try {
    const user = await userService.getUser(value.username);
    if (!user)
      return res.status(403).send({
        success: false,
        error: "Given username or password is incorrect",
      });

    if (bcrypt.compareSync(value.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: config.expiresIn,
      });

      return res.header({ accessToken: token }).send({
        success: true,
        message:
          "Successfully authorized! Token sent in header with key 'accessToken'",
      });
    } else
      return res.status(403).send({
        success: false,
        error: "Given username or password is incorrect",
      });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
