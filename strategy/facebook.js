require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const db = require('../models')
const FacebookStrategy = require('passport-facebook').Strategy

const router = express.Router()

router.use(bodyParser.json())

router.get('/fbhome', (req, res) => {
    res.json({
        location: "home in facebook strategy"
    })
})

//Setting up Facebook Stategy with passport

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK,
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(("Facebook Login Successful"))
        let user = await db.User.findOne(
            {
                where: {
                    authId: profile.id,
                    authStrat: process.env.FB_DBID
                }
            }
        )

        if (!user) {
            user = await db.User.build({
                authId: profile.id,
                username: profile.displayName,
                createAt: new Date(),
                updatedAt: new Date(),
                email: profile.email,
                authStrat: process.env.FB_DBID
            })
            await user.save();
        }

        cb(null, profile)
    }
));

router.get('/',
    passport.authenticate('facebook'))

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/')
    })

module.exports = router