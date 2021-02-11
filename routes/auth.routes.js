const router = require('express').Router();
const passport = require('passport');


var auth = require('./../controllers/auth.controllers');

const authCheck = (req, res, next)=>{
    if(req.user){
        //if user is not logged in
        res.redirect('/');
    }else{
        next();
    }
};

//Auth Login
router.get('/login', authCheck, auth.login)

//Auth Signup
router.get('/signup', authCheck, auth.signup);


//Register Handle
router.post('/signup', auth.register);

//Auth Logout
router.get('/logout', auth.logout);

//Auth with google
router.get('/google', authCheck, passport.authenticate('google', {scope: ['profile', 'email']}));

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.redirect('/profile/');
});


//Login Handle
router.post('/login', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

module.exports=router;
