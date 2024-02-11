require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connect = require('./connection/connect')
const verifyAuth = require('./middleware/verifyAuth')
const cookieParser = require('cookie-parser')
const app = express()

const { corsOption } = require('./config/whiteList')
const handleAccessControl = require('./middleware/handleAccessControl')
const PORT = process.env.PORT || 4173

connect()
app.use(handleAccessControl)
app.use(cors(corsOption))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/send', require('./routes/sendMsg'))
app.use('/refresh', require('./routes/refresh'))
app.use('/user', require('./routes/user'))
app.use('/logout', require('./routes/logout'))

//Protected routes
app.use(verifyAuth)
app.use('/messages', require('./routes/message'))

app.all('*', (req, res) => {
  res.send('404 ERROR :(')
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server up and running on ${PORT}`))
})
