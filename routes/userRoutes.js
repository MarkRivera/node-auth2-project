const express = require("express");
const router = express.Router();
const restricted = require("../data/middleware/restricted");
const Users = require("../data/models/users-model");

router.get("/", restricted, async (req, res, next) => {
  try {
    const allUsers = await Users.findUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
