require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const db = require('../models')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const router = express.Router()

router.use(session({
  secret: 'twitPatio',
  maxAge: (24 * 60 * 60 * 1000)
}))

//Setting up Google Stategy with passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    console.log(("Google Login Successful"));
    console.log(profile)
    let user = await db.User.findOne(
      {
        where: {
          authId: profile.id,
          authStrat: process.env.GOOG_DBID
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
        authStrat: process.env.GOOG_DBID
      })
      await user.save();
    }

    done(null, profile);
  }
));

router.use(bodyParser.json())

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (id, done) {
  done(null, id);
})

router.get('/auth/google',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router