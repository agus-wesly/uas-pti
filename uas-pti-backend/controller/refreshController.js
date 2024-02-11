const jwt = require("jsonwebtoken");
const usersModel = require("../model/usersModel");

const refreshController = async (req, res) => {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) return res.sendStatus(401);

  //Verify the refreshToken
  const user = await usersModel.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(401);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== user.username) return res.sendStatus(403);
    const newToken = jwt.sign({ username: decoded.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3m" });
    return res.status(200).json({ token: newToken, user: user.username, userId: user._id.toString() });
  });
};

module.exports = refreshController;
