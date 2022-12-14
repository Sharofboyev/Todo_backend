const router = require("express").Router();
const User = require("../services/user");
const userService = new User();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const auth = require("../middlewares/auth");
const e = require("express");

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
    const userId = await userService.create({
      username: value.username,
      password: hashed,
    });

    return res.status(201).send({ success: true, userId });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).send({
        success: false,
        error: `User with username ${value.username} already exists!`,
      });
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
    const user = await userService.get(value.username);
    if (!user)
      return res.status(404).send({
        success: false,
        error: "User with given username not found",
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
      return res.status(401).send({
        success: false,
        error: "Username or password is incorrect",
      });
  } catch (err) {
    return next(err);
  }
});

router.put("/password", auth, async (req, res, next) => {
  const { error, value } = Joi.object({
    password: Joi.string().required().min(5).max(256),
  }).validate(req.body);

  if (error)
    return res
      .status(400)
      .send({ success: false, error: error.details[0].message });

  const hashed = bcrypt.hashSync(value.password, 10);
  try {
    const updated = await userService.update(req.userId, { password: hashed });
    if (updated.modifiedCount > 0) return res.send({ success: true });
    else
      return res.status(404).send({
        success: false,
        error: "Invalid token, user not found",
      });
  } catch (err) {
    return next(err);
  }
});

router.delete("/account", auth, async (req, res, next) => {
  try {
    await userService.delete(req.userId);
    return res.send({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
