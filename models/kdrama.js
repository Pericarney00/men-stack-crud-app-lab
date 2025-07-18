const mongoose = require("mongoose")

const kdramaSchema = new mongoose.Schema({
  name: String,
  year: Number,
  genre: String,
  watched: Boolean,
})

const Kdrama = mongoose.model("Kdrama", kdramaSchema)

module.exports = Kdrama