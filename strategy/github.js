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
        console.log(("Github Login Successful"))
        let user = await db.User.findOne(
            {
                where: {
                    authId: profile.id,
                    authStrat: process.env.GH_DBID
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
                authStrat: process.env.GH_DBID
            })
            await user.save();
        }

        cb(null, profile)
    }
));

router.get('/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/')
    })

router.get('/',
    passport.authenticate('github'))


module.exports = router