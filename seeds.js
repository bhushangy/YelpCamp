var mongoose = require("mongoose")
var Campground = require("./models/campgrounds")
var Comment = require("./models/comment")


var data = [
    {
        name:"dcfcdfc",
        image : "https://image.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg",
        descreption:" Lorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum is "
    },
    {
        name:"dcfcdfc",
        image : "https://image.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg",
        descreption:"Lorem Ipsum is Lorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isL"
    },
    {
        name:"dcfcdfc",
        image : "https://image.shutterstock.com/image-vector/sample-red-square-grunge-stamp-260nw-338250266.jpg",
        descreption:"Lorem Ipsum Lorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLore"
    }

    
]

function seedDB(){
Campground.remove({},function(err){

    //remove all campg if they exist...
      
    if(err)
        console.log(err)
    else
        console.log("removed all")

    
//     //create a few campg
//     data.forEach(function(seed){
//         Campground.create(seed,function(err,campground){
//             if(err)
//                 console.log(err)
//             else {
//                 console.log("added bitch")

//                 //so right after creating the campground object u associate comment with that object 
//                 Comment.create(
//                     {
//                         text:"this place sucks",
//                         author:"homer"
//                     },function(err,comment){
//                         if(err)
//                             console.log(err)
//                         else{

//                             // see here comments is an array og objects defined inside the campg object
                            
//                             campground.comments.push(comment);
//                             campground.save();
//                             console.log("created comments");

//                            }
                            

//                     });

//                 }

//          });


//     });

    
 });
};






module.exports = seedDB;