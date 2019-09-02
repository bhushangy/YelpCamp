var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

// all middleware goes here

var middlewareObj = {};
//see here middlewareObj is an object inside which the functions check are there...u export this obj to routes where u call by obj.func
middlewareObj.checkCampgroundOwnership = function(req,res,next){
   

        if(req.isAuthenticated()){
          
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err || !foundCampground ){
                    req.flash("error","Campground not found!");
                    res.redirect("back")
                }
                 
                else{
    
                  //does user own the campground
                  if(foundCampground.author.id.equals(req.user._id)){
                        next();
                  }else{
                      req.flash("error","You are not authorised to do that!");
                      res.send("back");
                  }
                }
            
            });
    
        }else{
            req.flash("error","Pls login!");
            res.redirect("back");
        }
    
    
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
           Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err || !foundComment ){
                  req.flash("error","Comment not found!");
                  res.redirect("back");
              }  else {
                  // does user own the comment?
               if(foundComment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
              }
              
           });
       } else {
           req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
   }
   


middlewareObj.isLoggedIn = function(req,res,next){
  
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Pls login!");
    res.redirect("/login");

}



module.exports = middlewareObj;
