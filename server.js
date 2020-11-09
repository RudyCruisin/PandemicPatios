// -----------------------------------------------
//             LOADING DEPENDENCIES
// -----------------------------------------------
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const app = express()

// -----------------------------------------------
//             LOADING COOKIE
// -----------------------------------------------

app.use(session({
    secret: 'pandemicPatio',
    cookie: {},
    // maxAge: (10)
}))

// -----------------------------------------------
//             LOADING APIS/ROUTERS
// -----------------------------------------------
const gh_auth = require('./strategy/github')
const fb_auth = require('./strategy/facebook')
const google_auth = require('./strategy/google')
const twit_auth = require('./strategy/twitter')
const logout = require('./strategy/logout')

// const homeTest = require('./router/routerTest')

// -----------------------------------------------
//             LOADING MIDDLEWARE
// -----------------------------------------------

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/public'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/form', express.static(__dirname + '/form'))
app.use('/businessform', express.static(__dirname + '/businessform'))
app.use('/login', express.static(__dirname + '/login'))

// -----------------------------------------------
//             LOADING PASSPORT...
// -----------------------------------------------

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function (user, done) {
    // console.log("from server.js" + user)
    done(null, user);
})

passport.deserializeUser(function (id, done) {
    // console.log(id)
    done(null, id);
})

app.use('/auth/github', gh_auth)
app.use('/auth/facebook', fb_auth)
app.use('/auth/google', google_auth)
app.use('/auth/twitter', twit_auth)
app.use('/logout', logout)
// app.use('/', homeTest)

app.get('/testing', (req, res) => {
    res.send("Testing")
})

app.listen(process.env.PORT, () => {
    console.log("Server Running on port: " + process.env.PORT)
})


// Testing connection to database
// const { Sequelize } = require('sequelize')
// const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`)
// const db = require('./models')
// db.sequelize.authenticate().then(()=>{ 
//        console.log("Great Success!")
//        db.sequelize.sync()
//        db.Reviews.sync({ alter: true })
//        db.Restaurant.sync({ alter: true})
//        db.User.sync({ alter: true })
//  })

// -----------------------------------------------
//             Database Routes
// -----------------------------------------------
const reviewRoutes = require('./router/reviewRoutes')
const restRoutes = require('./router/restaurantRoutes')
const userRoutes = require('./router/userRoutes')

app.use('/review', reviewRoutes)
app.use('/restaurant', restRoutes)
app.use('/user', userRoutes)
