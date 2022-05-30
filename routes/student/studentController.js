const Student = require('../../models/studentModel');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
require('dotenv').config();

const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}
const AUTH_OPTIONS = {
  callbackURL: '/student/home',
  clientID: CONFIG.CLIENT_ID,
  clientSecret: CONFIG.CLIENT_SECRET
}
function verifyCallback(accessToken, refreshToken, profile, done) {
  // console.log(accessToken);
  // console.log(profile);
  console.log(profile.picture);
  // const name = profile.given_name;
  // req.session.isLoggedIn = true;
  // req.session.user = user;
  // console.log(name);
  console.log(profile.email);
  console.log(profile.given_name);
  // console.log(profile.family_name);
  Student.findOne({ email: profile.email })
  .then(userDoc => {
    if (userDoc) {
      return res.redirect('/alreadyregistered');
    }
      const user = new Student({
        email: profile.email,
        name: profile.given_name,
        profilePic: profile.picture,

      });
      console.log("saved");
      return user.save();
    

  // console.log(refreshToken);
// done(null, profile);
});
};

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.displayName);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});

exports.homePage = (req, res, next) => {
    res.send("Hi Student!");
};

exports.loginPage = (req, res, next) => {
    res.render('public/loginPage', {
      pageTitle: 'Login',
      pageHead: 'Student Login',
      loginLink: 'login/google'
    });
  };
