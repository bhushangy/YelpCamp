var express          = require("express"),
     app             = express(),
     bodyParser      = require("body-parser"),
     mongoose        = require("mongoose"),
     flash           = require("connect-flash"),
     passport        = require("passport"),
     LocalStrategy   = require("passport-local"),
     methodOverride  = require("method-override"),
     //db schema setup indise model folder
     Campground      = require("./models/campgrounds"), // './' --> meaning from the current directory ur in look for models folder and then campgrounds.js file  
     seedDB          = require("./seeds"),
     User            = require("./models/user"),
     Comment         = require("./models/comment")
     
//requring routes    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

// PASSPORT CONFIG

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){   
    res.locals.currentUser = req.user;  //this is to make the current user info available in all routes...
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

app.use("/", indexRoutes); //these indexRoutes are all callback functions that those routes file exports 
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(3000,function(){
    console.log("yelpcamp server has started")
  
});




// Campground.create(
//     {
//         name: "Goech La",
//         image:"https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//         descreption:"This place is in Sikkim and stretches upto Nepal."
//     },function(err,campground){
//         if(err)
//             console.log("error")
//         else
//             {
//                 console.log("new cg added");
//                 console.log(campground);
//             }
//     }

// );