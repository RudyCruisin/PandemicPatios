require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')

const router = express.Router()

router.use(bodyParser.json())

router.get('/', (req, res) => {
    req.logout()
    // req.session.destroy(function (err) {
    // res.clearCookie('connect.sid')
    res.redirect('/')
    console.log('You are logged out.')
    // })
})

module.exports = router