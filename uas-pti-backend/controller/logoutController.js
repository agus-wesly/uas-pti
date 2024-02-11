const usersModel = require("../model/usersModel");

const logoutController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  const found = await usersModel.findOne({ refreshToken }).exec();
  if (!found) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  found.refreshToken = "";
  await found.save();
  res.clearCookie("jwt", { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
  return res.sendStatus(204);
};

module.exports = logoutController;
