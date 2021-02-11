const Restaurant = require('../models/restaurant.model');
var Post = require('./../models/post.model');




module.exports.add = function(req, res){
    res.render('addRestaurant.ejs', {user: req.user});
}

module.exports.new = function(request, response){
    let restaurant = new Restaurant(request.body);
    restaurant.save(function(err, data){
        if(err){
        return response.status(400).json({msg: "All fields are required!"});
        }
        return response.status(200).json({restaurant:data});
    });
}


module.exports.read = function(request, response){
    console.log(request.params.id)
    Restaurant.find({'_id':request.params.id}, 
    function(err, data){
        if(err){
            return response.status(400)
                            .json({msg: 'Could not query the db'})
        }
        console.log(data)
        return response.render('singlerestsurants.ejs', {
            restaurant:data[0]
        })
    })
  }


  module.exports.post = function(request, response){
    let post = new Post(request.body);
    console.log(post)
    post.save(function(err, data){
        if(err){
        return response.status(400).json({msg: "All fields are required!"});
        }
        return response.status(200).json({post:data});
    });
}

