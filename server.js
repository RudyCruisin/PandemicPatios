// -----------------------------------------------
//             LOADING DEPENDENCIES
// -----------------------------------------------
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// -----------------------------------------------
//             LOADING APIS/ROUTERS
// -----------------------------------------------
const gh_auth = require('./strategy/github')
// const homeTest = require('./router/routerTest')

// -----------------------------------------------
//             LOADING MIDDLEWARE
// -----------------------------------------------

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/public'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.use('/', gh_auth)
// app.use('/', homeTest)

app.get('/testing', (req, res) => {
    res.send("Testing")
})

app.listen(process.env.PORT, () => {
    console.log("Server Running on port: " + process.env.PORT)
})