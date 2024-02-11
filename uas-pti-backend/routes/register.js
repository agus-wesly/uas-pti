const express = require('express')
const router = express.Router()
const registerController = require('../controller/registerController.js')

router.post('/',registerController )

module.exports = router