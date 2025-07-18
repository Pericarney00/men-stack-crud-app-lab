const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()


app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Kdrama = require("./models/kdrama.js")


//GET (READ) - Landing Page
app.get("/", async (req, res) => {
  res.render("index.ejs")
})
//Get (READ) -new form to add new dramas
app.get("/kdramas/new", async (req, res) => {
  res.render("kdramas/new.ejs")
})

app.post("/kdramas", async (req, res) => {
  if (req.body.watched === "on") {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  await Kdrama.create(req.body);
  res.redirect("/kdramas/new")
});

//1.Get(READ) -index /kdramas :display all kdramas
//2.POST(create) -create /kdramas/new :submitting data to the database
//3.GET (READ) -show /kdramas/:kdramaId :display a specific kdrama
//4. Get (READ) -edit /kdramas/:kdramaId/edit  :edit specific kdrama data (ex. did you watch it,yes, click the checkbox)
//5. PUT (UPDATE) -update /kdramas/:kdramaId :submitted edit data
//6. DELETE (DELETE) -delete /kdramas/:kdramaId :removing kdrama from the database
app.listen(3000, () => {
  console.log("listening on port 300")
})