require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const router = express.Router()

router.use(bodyParser.json())

router.get('/fbhome', (req, res) => {
    res.json({
        location: "home in facebook strategy"
    })
})

//Setting up Facebook Stategy with passport
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK,
    profileFields: ['email', 'name']
},
    function (accessToken, refreshToken, profile, done) {
        const { email, first_name, last_name } = profile.json;
        const userData = {
            email,
            firstName: first_name,
            lastName: last_name
        };
        new userModel(userData).save();
        done(null, profile)
    }
))

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    (req, res) => { res.redirect('/') })

router.get('/auth/facebook',
    passport.authenticate('facebook'))

module.exports = router