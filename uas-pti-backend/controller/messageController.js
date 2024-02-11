const messageModel = require('../model/messageModel')

const messageController = async (req, res) => {
  const userId = req.query.id
  //Get the message from Database
  try {
    const messages = await messageModel.find({ userId }).exec()

    if (messages.length === 0) {
      res.json({ messages: 'No messages' })
      return
    }
    res.json(messages)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

const deleteMessage = async (req, res) => {
  const { id } = req.body
  if (!id) return res.sendStatus(400)
  try {
    const resp = await messageModel.deleteOne({ id }).exec()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

const getMessage = async (req, res) => {
  const id = req.query.id
  if (!id) return res.sendStatus(400)

  try {
    const message = await messageModel.findOne({ id }).exec()
    res.json(message)
    return
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

module.exports = { messageController, deleteMessage, getMessage }
