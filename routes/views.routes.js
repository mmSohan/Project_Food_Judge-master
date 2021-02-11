const Restaurant = require('../models/restaurant.model');
const Post = require('../models/post.model');


const router = require('express').Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser());

var views = require('./../controllers/views.controllers');
router.get('/home', views.home);
router.get('/', views.home);


router.post("/", function(req, res) {
    res.cookie("geometry", `${req.body.lat}:${req.body.long}`, { httpOnly: true });
    res.redirect("/restaurant/nearby");
});


router.get('/restaurants', function(req, res){
    Restaurant.find({}, function(err, users) {
        res.render('restaursnts.ejs', {rest: users});
     });
})

router.get('/reviews', function(req, res){
    Post.find({}, function(err, users) {
        res.render('review.ejs', {rest: users});
     });
});

router.get('/contact', (req, res)=>{
    res.render('contact.ejs');
})

module.exports=router;