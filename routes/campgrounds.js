var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/index.js");


// INDEX route - "/campgrounds" - show all campgrnds to user - GET


  
    //get all campgrounds from DB

    /*...so first it runs the find method and after running find method,the response got from
    the DB is stored in err or all campgrounds object that are both the params of the callback func
    and u display those objects..*/

   
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});


//CREATE route -"/campgrounds" - Post

router.post("/",middleware.isLoggedIn,function(req,res){

//here get data from form and add to campgrouns array

    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var descreption = req.body.descreption;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    
    var newCampground = {name:name,image:image,price:price,descreption:descreption,author:author};
    //create  a new campg and save to DB by passing in the object created above which is newCampground

     Campground.create(newCampground,function(err,newlyCreated){
        
        if(err){
                req.flash("error","Something went wrong..Pls try again!");
                res.redirect("back");
        }
       
    else
        {   console.log(newlyCreated)
            //redirect back to campgrounds page..
            res.redirect("/campgrounds"); //see by default this will redirecr as a post req

        }


     })

});





//NEW route - "/campgrounds/new"- Add a new campground thru a form - Get

router.get("/new",middleware.isLoggedIn,function(req,res){

res.render("campgrounds/new.ejs")

/*soo data flow as of now..manually go to campground/new page 
where u r rendered a form...once u submit form..u r redirected to
as post request to the /campgrounds page where the app.post 
function is run and the form data is fetched...and ushed as a new
object into the list of objects...now you redirect back to /campgrounds 
page as a get request and the new data is passed to the campgrounds.ejs file
which is rendered back with new campsite...*/

});



//SHOW - route - shows more info on a campground - GET

router.get("/:id",function(req,res){

    //find campgrnd with provided id
    //the id is got from the index.ejs page inside the more info button and when u click more info but..u r redirected... 
    //...here along with the id that is sent and it is there in the req object...so u r extracting that in next line..req.params.id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){

        if(err || !foundCampground){
            
            req.flash("error","Campground not found!");
            res.redirect("back");
        }
            
    else
        {
            //render show page
            /*see here the nimmoun is the object u get back from the find function
             and is caught by the foundcampg ob which can be any name..now afte..
            now after catching the object pass it under any name to the ejs file 
            and use that same name in the ejs file to get data out of it...*/
            res.render("campgrounds/show",{nimmoun:foundCampground}); 

        }




    });


});


// EDIT CAMPGROUND ROUTE...only the person who created that campg shud be able to edit..so try by checking if req.params.id.author is == the author who is trying to update the cg...otherwise provide edit option to only the person who has created the post and not everyone 
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res){      
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error","campground doesn't exist");
                res.redirect("/campgrounds");
            }else{
                res.render("campgrounds/edit",{campground:foundCampground});
            }
             
            
        });

});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           req.flash("error","campground doesn't exist");
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show.ejs page)
           res.redirect("/campgrounds/" + req.params.id); //note that the author of the edit route or name of person who edits the post will not be displayed..
       }
    });
});


// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error","Campground not found!");
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
    });
 });



module.exports = router
