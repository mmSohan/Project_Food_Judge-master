var path = require('path');
var express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const viewRoutes = require('./routes/views.routes');
const passportSetup = require('./passport-setup');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

var app = express();

//set up view engine
//app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(cookieSession({
	maxAge: keys.session.maxAge,
	keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
console.log(__dirname);
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended:true}));

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,
    {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
        console.log('Connected to mongodb');
    });
  mongoose.connection.on('error', function(err){
    console.log("Could not connect to MongoDB")
  });

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//Connect flash
app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//set up routes
app.use('/auth',authRoutes);
app.use('/profile', profileRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/', viewRoutes);


app.listen(keys.port, ()=>{
	console.log('Server is running!');
});