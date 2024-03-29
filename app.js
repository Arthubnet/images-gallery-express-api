const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors");

const port = process.env.PORT || 3000;

//parsing anyime we got request to the server
app.use(bodyParser.json());

//cors
app.use(cors());

//middlewear
app.use("/new-image/:query", async (req, res) => {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?query=${req.params.query}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
  ).then((data) => data.json());

  res.json(response);
});

// import routes
const imagesRoute = require("./routes/images");
app.use("/images", imagesRoute);

//routes
app.get("/", (req, res) => {
  res.send("Picture app API server");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB");
}, e => console.error(e));


//listening the server
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`The server started at port ${port}`);
    });

  } catch (error) {
    console.log(error);
  }
}

start()