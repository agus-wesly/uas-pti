const usersModel = require('../model/usersModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginController = async (req, res) => {
  const { user, pwd } = req.body

  if (!user || !pwd)
    return res.status(400).json({ message: 'Username or password requried' })

  //Checking username and password
  const foundUser = await usersModel.findOne({ username: user }).exec()
  if (!foundUser) return res.sendStatus(401)
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (!match) return res.sendStatus(401)

  //Creating access token & refresh token
  const accessToken = jwt.sign(
    { username: foundUser.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  )
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '5h' }
  )

  foundUser.refreshToken = refreshToken
  await foundUser.save()

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.status(200).json({ token: accessToken, userId: foundUser._id.toString() })
}

module.exports = loginController
