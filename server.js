const express = require('express')
const app = express()

app.use('/', express.static(__dirname + '/public'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/testing', (req, res) => {
    res.send("Testing")
})

app.listen(9000, () => {
    console.log('connected to port 9000')
})