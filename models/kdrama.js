const mongoose = require("mongoose")

const kdramaSchema = new mongoose.Schema({
  name: {type: String, required:true},
  year: {type:Number, required:true},
  genre: {type:String, required:true},
  watched: {type:Boolean, required:true},
  image: { type: String } ,
}) 

const Kdrama = mongoose.model("Kdrama", kdramaSchema)

module.exports = Kdrama