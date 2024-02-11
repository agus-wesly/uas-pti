const jsonwebtoken = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.headers["Authorization"] || req.headers.authorization;
  if (!token) return res.sendStatus(401);
  const accessToken = token.split(" ")[1];

  jsonwebtoken.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyAuth;
