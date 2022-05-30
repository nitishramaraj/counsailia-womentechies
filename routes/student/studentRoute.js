const path = require('path');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');

const express = require('express');

const studentController = require('./studentController');

checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

const router = express.Router();
function checkLoggedin(req,res,next){
    const isLoggedin = true;
    if(!isLoggedin){
      return res.status(401).json({Error: "Login asap"});
    }
    next();
  }

// router.get('/', studentController.welcomePage);
router.get('/login', checkLoggedin ,studentController.loginPage);
router.get('/login/google', passport.authenticate('google', {
    scope:['email', 'profile'],
}));

router.get('/login/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/sucess',
    session: true,
}), (req,res) => {
    console.log("google calling");
    console.log(profile);
});

router.get('/home', studentController.homePage )

module.exports = router;