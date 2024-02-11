const express = require('express')
const Router = express.Router()
const {
  messageController,
  deleteMessage,
  getMessage,
} = require('../controller/messageController')

Router.get('/', messageController)
Router.delete('/', deleteMessage)
Router.get('/detail', getMessage)

module.exports = Router
