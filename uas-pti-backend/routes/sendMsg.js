const express = require("express");
const Router = express.Router();
const postMsgController = require("../controller/postMsgController");

Router.post("/", postMsgController);

module.exports = Router;
