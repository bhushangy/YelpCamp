var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/cat_app",{ useNewUrlParser:
true})

var catSchema = new mongoose.Schema({

    name:String,
    age:Number,
    temperment:String

});

var Cat = mongoose.model("Cat",catSchema);

//SO Cat is the object thru which u call methods      

//add

// var george = new Cat({
//     name:"noris",
//     age:11,
//     temperment:"bhadwa"
// });

// george.save(function(err,cat){
//     if(err)
//         console.log("Something went wrong")
//     else
//         {
//             console.log("we just saved a cat to the db")
//             console.log(cat)
//         }
// });

Cat.create({
    name:"white",
    age:4,
    temperment:"cool"
},function(err,cat){
    if(err)
        console.log(err);
    else
        console.log(cat);
});

//retrieve
// Cat.find({},function(err,cats){

//     if(err)
//         {
//              console.log("Something went wrong")
//              console.log(err)
//         }
//      else
//         {
//              console.log("these are the cats in db")
//             console.log(cats)
//          }


// });