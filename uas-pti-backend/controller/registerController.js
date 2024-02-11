const bcrypt = require('bcryptjs')
const usersModel = require('../model/usersModel')
const counterModel = require('../model/counterModel')

const registerController = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username or Password is requred !' })
  const existingUser = await usersModel.findOne({ username: user }).exec()
  if (existingUser) return res.sendStatus(409)

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10)
    const newUser = await usersModel.create({
      username: user,
      password: hashedPwd,
    })
    res.status(200).json({ message: `Username ${user} successfully created !` })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to create account !' })
  }
}

module.exports = registerController
