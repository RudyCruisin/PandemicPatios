require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const router = express.Router()

router.use(bodyParser.json())

router.get("/home", (req, res) => {
    res.json({
        location: "home in passport"
    })
})

//Setting up Github Strategy with passport

passport.use(new GitHubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CALLBACK
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(JSON.stringify(profile))

        console.log("Access Token: " + accessToken)

        cb(null, profile)
    }
));

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (id, done) {
    done(null, id);
})

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    })

router.get('/auth/github',
    passport.authenticate('github'))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
    console.log('You are logged out.')
})

module.exports = router