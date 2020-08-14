const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../data/config/secrets");
const router = express.Router();
const { findUserByUsername, add } = require("../data/models/users-model");

router.post("/register", async (req, res) => {
  try {
    const user = await findUserByUsername(req.body.username);
    if (user && user.username === req.body.username) {
      res.status(400).json({ message: "That user already exists!" });
    } else {
      const hash = await bcrypt.hash(req.body.password, 14);
      req.body.password = hash;
      const newUser = await add(req.body);
      res.status(200).json(newUser);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong on the server, sorry!" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    console.log(user.password);
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);

    if (user && isValid) {
      const token = generateToken(user);
      res.status(200).json({ message: "successful login", token });
    } else {
      res.status(200).json({ message: "Invalid Credentials!" });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "30s",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
