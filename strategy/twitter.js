require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const db = require('../models')
const TwitterStrategy = require('passport-twitter').Strategy

const router = express.Router()

router.use(bodyParser.json())

router.get('/twithome', (req, res) => {
    res.json({
        location: "home in twitter strategy"
    })
})

//Setting up Twitter Stategy with passport
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWIT_ID,
    consumerSecret: process.env.TWIT_SECRET,
    callbackURL: process.env.TWIT_CALLBACK,
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log("Twitter Login Successful")
        let user = await db.User.findOne(
            {
                where: {
                    authId: profile.id,
                    authStrat: process.env.TWIT_DBID
                }

            }
        )

        if (!user) {
            user = await db.User.build({
                authId: profile.id,
                username: profile.username,
                createAt: new Date(),
                updatedAt: new Date(),
                email: profile.email,
                authStrat: process.env.TWIT_DBID
            })
            await user.save();
        }

        cb(null, profile)
    }
));

router.get('/',
    passport.authenticate('twitter'))

router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/')
    })

module.exports = router