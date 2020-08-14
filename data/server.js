const express = require("express");
const server = express();
const helmet = require("helmet");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");

server.use(express.json());
server.use(helmet());

server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);
server.use("/", (error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something broke on the server!" });
});

module.exports = server;
