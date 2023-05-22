let mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/youtubeRegistration").then(()=>{
    console.log("database connected")
}).catch((error)=>{
    console.log("error in database connection")
})