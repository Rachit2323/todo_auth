const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  } 

  const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }



  jwt.verify(token, "sknscjbcjbjsbjeru", (err, user) => {
    if (err) {

      return res.status(403).json({ message: "Token is not valid" });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
