const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")

const app = express()


app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Kdrama = require("./models/kdrama.js")

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"));
app.use(morgan("dev"));



//GET (READ) - Landing Page
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

//Get (READ) -new form to add new dramas
app.get("/kdramas/new", async (req, res) => {
  res.render("kdramas/new.ejs")
})

//2.POST(create) -create /kdramas/new :submitting data to the database
app.post("/kdramas", async (req, res) => {
  if (req.body.watched === "on") {
    req.body.watched = true
  } else {
    req.body.watched = false
  }
  await Kdrama.create(req.body);
  res.redirect("/kdramas/")
});

//1.Get(READ) -index /kdramas :display all kdramas
app.get("/kdramas", async (req, res) => {
  const allKdramas = await Kdrama.find();
  res.render("kdramas/index.ejs", {kdramas: allKdramas})
})


//3.GET (READ) -show /kdramas/:kdramaId :display a specific kdrama
app.get("/kdramas/:kdramaId", async (req, res) => {
  const foundKdrama = await Kdrama.findById(req.params.kdramaId)
  res.render("kdramas/show.ejs", {kdrama: foundKdrama})
})
//6. DELETE (DELETE) -delete /kdramas/:kdramaId :removing kdrama from the database
app.delete("/kdramas/:kdramaId", async (req, res) => {
  await Kdrama.findByIdAndDelete(req.params.kdramaId);
  res.redirect("/kdramas")
})

//4. Get (READ) -edit /kdramas/:kdramaId/edit  :edit specific kdrama data (ex. did you watch it,yes, click the checkbox)
app.get("/kdramas/:kdramaId/edit", async (req, res) => {
  const foundKdrama = await Kdrama.findById(req.params.kdramaId)
  res.render("kdramas/edit.ejs", {kdrama: foundKdrama})
})
//5. PUT (UPDATE) -update /kdramas/:kdramaId :submitted edit data
app.put("/kdramas/:kdramaId", async (req, res) => {
  if (req.body.watched === "on") {
    req.body.watched = true;
  } else {
    req.body.watched = false;
  }
  await Kdrama.findByIdAndUpdate(req.params.kdramaId, req.body)
  res.redirect(`/kdramas/${req.params.kdramaId}`)
});



app.listen(3000, () => {
  console.log("listening on port 300")
})