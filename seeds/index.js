
const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/camp-stop", { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("data base connected");
});

const semple =array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
  for(let i=0; i<2;i++){
      const randome1000 = Math.floor(Math.random()*1000);
      const price = Math.floor(Math.random()*21) +10;
     const camp= new Campground({
         author:"610b27c9e703c6910754e1a4",
          location: `${cities[randome1000].city}, ${cities[randome1000].state}`,
          title: `${semple(descriptors)} ${semple(places)}`,
          geometry: { type: "Point", 
          coordinates: [ 
           cities[randome1000].longitude, 
           cities[randome1000].latitude,
          ] },
          images: [
    {
      
      url: 'https://res.cloudinary.com/div355m8n/image/upload/v1628200237/CampStop/zbztekdwzjtavfv9n6hf.jpg',
      filename: 'CampStop/zbztekdwzjtavfv9n6hf'
    }
  ],
          description:"Camping, forest, campfire, food over fire, coffee, mist, woods, sunsets, lakes, leaves and treesCamping, forest, campfire, food over fire, coffee, mist, woods, sunsets, lakes, leaves and treesCamping, forest, campfire, food over fire, coffee, mist, woods, sunsets, lakes, leaves and trees",
          price

      });
      await camp.save();
  }
}
seedDB().then(()=>{
    mongoose.connection.close();
})