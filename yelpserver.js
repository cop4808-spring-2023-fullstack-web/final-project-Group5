//load keys from the .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const mongoClient = new MongoClient(uri);
mongoClient.connect();
const db = mongoClient.db("odyssey");
const coll = db.collection("users");

const yelp = require("yelp-fusion");
const client = yelp.client(process.env.yelpAPIkey);

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//mongo endpoints here
//get user obj based on userID
app.get("/user/:userID", async function (req, res) {
  var id = req.params.userID;

  const cursor = await coll.findOne({ UID: id });
  return res.status(200).send(cursor);
});

//post favorite to user ID
app.post("/favorites/:userID", async function (req, res) {
  var id = req.params.userID;

  coll.updateOne({ UID: id }, { $push: { favorites: req.body.bizID } });

  return res.status(201);
});

//delete favorite from users favorites
app.delete("/favorites/:userID", async function (req, res) {
  var id = req.params.userID;

  coll.updateOne({ UID: id }, { $pull: { favorites: req.body.bizID } });

  return res.status(200);
});

//edit preferenes
app.patch("/preferences/:userID", async function (req, res) {
  var id = req.params.userID;

  const newPreferences = {
    hotel: req.body.hotel,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    activity: req.body.activity,
    dinner: req.body.dinner,
  };

  coll.updateOne({ UID: id }, { $set: { preferences: newPreferences } });
  return res.status(201).send(newPreferences);
});

//add trip with data
app.post("/trip/:userID", async function (req, res) {
  var id = req.params.userID;

  const trip = {
    id: "1",
    destination: req.body.destination,
    from: req.body.from,
    to: req.body.to,
    hotel: req.body.hotel,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    activity: req.body.activity,
    dinner: req.body.dinner,
  };

  coll.updateOne({ UID: id }, { $push: { trips: trip } });

  return res.status(201).send(trip);
});

//add a user
app.post("/user/:userID", async function (req, res) {
  var id = req.params.userID;

  coll.insertOne({
    favorites: [],
    trips: [],
    preferences: {
      hotel: [],
      breakfast: [],
      lunch: [],
      activity: [],
      dinner: [],
    },
    UID: id,
  });

  return res.status(201).send(coll.findOne({ UID: id }));
});

("use strict");

//Endpoint for searching businesses based on:
//  -term(food, hotel, etc.)
//  -location(zipcode, city, etc.)
//  *It is possible to include more search params like price/category
app.get("/search/:term/:location", async function (req, res) {
  const searchTerm = req.params.term;
  const searchLocation = req.params.location;

  client
    .search({
      term: searchTerm,
      location: searchLocation,
    })
    .then((response) => {
      return res.status(200).send(response.jsonBody.businesses);
    })
    .catch((e) => {
      console.log(e);
    });
});

//Endpoint to retrieve business details by using biz ID or Alias.
app.get("/biz/:id", async function (req, res) {
  const bizID = req.params.id;

  client
    .business(bizID)
    .then((response) => {
      return res.status(200).send(response.jsonBody);
    })
    .catch((e) => {
      console.log(e);
    });
});

//Endpoint to retrieve 3 reviews from biz ID
//Also possible to change the sort_by param to sort by newest instead of default
app.get("/biz/:id/reviews", async function (req, res) {
  const bizID = req.params.id;

  client
    .reviews(bizID)
    .then((response) => {
      return res.status(200).send(response.jsonBody);
    })
    .catch((e) => {
      console.log(e);
    });
});

//Endpoint to retrieve yelp search categories/terms based on input text
//May need to account for spaces in string input
app.get("/auto/:text", async function (req, res) {
  const autoText = req.params.text;

  client
    .autocomplete({
      text: autoText,
    })
    .then((response) => {
      return res.status(200).send(response.jsonBody);
    })
    .catch((e) => {
      console.log(e);
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("odyssey/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "odyssey", "build", "index.html"));
  });
}

app.listen(port || 8000); //start the server
console.log(`Server is running at port ${port || 8000}`);
