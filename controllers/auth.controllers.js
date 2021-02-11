const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.login = function(req, res){
    res.render('login.ejs', {user: req.user});
}

module.exports.signup = function(req, res){
    res.render('signup.ejs');
}

module.exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}

module.exports.register = function(req, res){
    const { name, email, pass, re_pass, agree}=req.body;
    let errors = [];

    //Check terms agree
    if(agree == undefined){
        errors.push({msg: 'Please accepct term and conditions'});
    }

    //Check require fields
    if(!name || !email || !pass || !re_pass){
        errors.push({msg: 'Please fill in all fields'});
    }

    //Check password match
    if(pass !== re_pass){
        errors.push({msg: 'Password do not match'});
    }

    //Check pass lemgth
    if(pass.length < 6){
        errors.push({msg: 'Password should be at least 6 chracters'});
    }

    if(errors.length>0){
        res.render('signup.ejs', {errors, name, email, pass, re_pass});
    }else{
        //validation passed
        User.findOne({email: email}).then(user =>{
            if(user){
                //user exisets
                if(user.provider != ''){
                    errors.push({msg: `Already have an account. Please login in with your ${user.provider} account.`});
                }else{
                    errors.push({msg: 'Email is already registered. Please login.'});
                }
                res.render('signup.ejs', {errors, name, email, pass, re_pass});
            }else{
                const newUser = new User({
                    username: name,
                    email: email,
                    password: pass,
                    creationYear: new Date().getFullYear()
                });
                //Hash Password
                bcrypt.genSalt(10, (err, salt)=> 
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if(err) throw err;

                        //Set password to hashed
                        newUser.password = hash;

                        //Save user
                        newUser.save().then(user=>{
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/auth/login');
                        }).catch(err=> console.log(err));
                }))
            }
        })
    }
    
}

