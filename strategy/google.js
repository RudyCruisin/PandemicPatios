require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const db = require('../models')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

const router = express.Router()

router.use(bodyParser.json())

//Setting up Google Stategy with passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    console.log(("Google Login Successful"));
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

router.get('/',
  passport.authenticate('google', {
    scope:
      ['email', 'profile']
  }
  ));

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

module.exports = router