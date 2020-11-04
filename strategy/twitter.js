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

router.use(session({
    secret: 'magicPatio',
    maxAge: (24*60*1000*60)
}))



//Setting up Twitter Stategy with passport
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWIT_ID,
    consumerSecret: process.env.TWIT_SECRET,
    callbackURL: process.env.TWIT_CALLBACK,
    // profileFields: ['email', 'name']
},
    async function (accessToken, refreshToken, profile, cb) {
        //console.log(profile)
        //console.log(profile.username)
        //console.log("Access Token: "+ accessToken)
        console.log("Twitter Login Successful")
        let user = await db.User.findOne({ where: { TWIT_ID: (profile.id) }})

        if (!user) {
            user = await db.User.build({
                TWIT_ID: profile.id,
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
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

router.get('/auth/twitter',
    passport.authenticate('twitter'))

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/')
    })

module.exports = router