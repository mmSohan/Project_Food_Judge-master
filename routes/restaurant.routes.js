var https = require('follow-redirects').https;
const router = require('express').Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser());
const Restaurant = require('../models/restaurant.model');
const Window = require('window');
var Post = require('./../models/post.model');

 
const window = new Window();

var restaurant = require('../controllers/restaurant.controllers');

router.get('/add', restaurant.add);
router.post('/add', restaurant.new);

 router.get("/nearby", function(req, res) {
//     var context = req.cookies["geometry"].split(':');
//     res.clearCookie("geometry", { httpOnly: true });
//     var latitude = parseFloat(context[0]);
//     var longitude = parseFloat(context[1]);
//     var radius = 100;
//     var result;
    
//     https.request({
//             host: 'maps.googleapis.com',
//             path: '/maps/api/place/nearbysearch/json?location='+latitude+','+longitude+'&radius='+radius+'&type=restaurant&fields=formatted_address,name&key=AIzaSyDqvqjZzlMqBdFiBSx3j2L_qZ4v_Xw8ngc',
//             method: 'GET'},function(response){
//         response.on('data', function(res){
//             result=res;
//         });
//         }).end();
    

    var result = {
            "html_attributions" : [],
            "next_page_token" : "CrQCIQEAAOmDX6QH0egsRPHvw8zIobO_SBjU_0i1yQEP3sBgnfA2h4oAQLBtsOq5PHg-kv5_FL2PladrqVl9_wY5xfnCOH6h15VMKd1zRfuFmQR123juu6zbZ8qcMu-HqvMhUaX-QTRzZWn8amaUaR_mFUiShWIyUFSRpVgYvlcP5hVdbCihgzD_bV_k8SHsBYfzXnd80fixU9wiAjoqOIliEOGxWR5flRFoenIu5j9eMfnDKACOFBvdFfGiD9P7FSLLUSFjw7sF9G4UmMdzRk-XaVIj_TXatQnqkgGUcq4opDoaA9ttHHi74cK8PotEoFSsQmOKJKKhKDBvJWkbg7cPk6T369mJJdInk-ODq_8egvgChuEKiK1uPDCAY65Ak4z-18v3PskndC5i_WNMyKmiqPdD6pwSEK05pkxfPfRZ_rcwH5pNqrQaFANpD0RQB7x6_a_RaK9BilNhQmc3",      
            "results" : [
               {
            "geometry" : {
               "location" : {
                  "lat" : 23.81443549999999,
                  "lng" : 90.42105760000001
               },
               "viewport" : {
                  "northeast" : {
                     "lat" : 23.8157844302915,
                     "lng" : 90.42240268029151
                  },
                  "southwest" : {
                     "lat" : 23.8130864697085,
                     "lng" : 90.41970471970849
                  }
               }
            },
            "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
            "id" : "cf4a801daf20edb9fd7a79f97f17388b2dd3d54b",
            "name" : "Dhaka Mushroom Center",
            "opening_hours" : {
               "open_now" : false
            },
            "place_id" : "ChIJeWT4a1LGVTcRjRgnEh4UqWw",
            "plus_code" : {
               "compound_code" : "RC7C+QC Dhaka, Bangladesh",
               "global_code" : "7MMGRC7C+QC"
            },
            "rating" : 3,
            "reference" : "ChIJeWT4a1LGVTcRjRgnEh4UqWw",
            "scope" : "GOOGLE",
            "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
            "user_ratings_total" : 4,
            "vicinity" : "39/1, House #Ka-121 Joar Shahara Bazar Road, Dhaka"
         }
      ],
      "status" : "OK"
    };
    
 
    
    var y = result['results'];


    Restaurant.find({name: y[0].name}, function(err,users){
        res.render('nearbyreasult.ejs', {name: users[0].name, lat: users[0].latitude, long: users[0].longitude, rating: users[0].rating, id: users[0]._id, ot: users[0].openingTime, ct: users[0].closingTime})
     });
     
});


router.get('/nearby/:id', restaurant.read);

router.post('/nearby/post', restaurant.post);

module.exports=router;
