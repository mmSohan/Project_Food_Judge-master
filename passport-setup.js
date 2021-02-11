const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('./config/keys');
const User = require('./models/user.model');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
});

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },(accessToken, refreshToken, profile, done)=>{
        //cheak if user already exists in our database
        User.findOne({email: profile._json.email}).then((currentUser)=>{
            if(currentUser){
                //already have the user
                console.log('user is:'+currentUser);
                done(null, currentUser);
            }else{
                //create user in our db
                new User({
                    username: profile.displayName,
                    email: profile._json.email,
                    providerId: profile.id,
                    provider: profile.provider,
                    profilePic: profile._json.picture,
                    creationYear: new Date().getFullYear()
                }).save().then((newUser)=>{
                    console.log('New user created: '+newUser);
                    done(null, newUser);
                });
            }
        }); 
    })
);

passport.use(
    new LocalStrategy({
        //options for the local strategy
        usernameField: 'email'
    }, (email, password, done)=>{
        //cheak if user already exists in our database
        User.findOne({email: email})
            .then((user)=>{
                if(!user){
                    return done(null, false, {message: 'This email is not registered'});
                }
                //Match password
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            })
            .catch(err => console.log(err));
    })
);