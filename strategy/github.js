require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const db = require('../models')
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
    async function (accessToken, refreshToken, profile, cb) {
        console.log((profile))
        console.log("Access Token: " + accessToken)

        let user = await db.User.findOne({ where: { GH_ID: (profile.id) }})

        if (!user) {
            user = await db.User.build({
                GH_ID: (profile.id),
                username: profile.username,
                createAt: new Date(),
                updatedAt: new Date(),
                email: profile.email,
            })
            await user.save();
        }

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