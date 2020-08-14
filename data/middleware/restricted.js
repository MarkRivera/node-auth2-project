const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

function protected(req, res, next) {
  const [authType, token] = req.headers.authorization.split(" ");

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You have no token" });
  }
}

module.exports = protected;
