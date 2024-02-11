const express = require("express");
const Router = express.Router();
const usersModel = require("../model/usersModel");

Router.get("/", async (req, res) => {
  const { id } = req.query;
  const findUser = await usersModel.findById(id).exec();
  if (!findUser) return res.sendStatus(404);
  return res.status(200).json({ username: findUser.username });
});

module.exports = Router;
