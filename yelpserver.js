//load keys from the .env file
require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Connect to MongoDB and once connected listen for requests on port 5678
mongoose
  .connect(process.env.URI)
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => console.log(`Error connecting to MongoDB`, err));

const db = mongoose.connection; //set db to mongoose connection
const collection = db.collection(process.env.Col); //set collection to full database collection

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

// NEW working favorites
app.put("/favorites/:userID/:businessID", function (req, res) {
  // defined object for response
  var rsp_obj = {};
  const businessID = req.params.businessID;

  // define user ID from authenticated user
  const userID = req.params.userID;

  // define obj for favorite
  const favorite = req.body;

  collection
    .findOne({ userID: userID, "favorites.id": businessID })
    .then((result) => {
      if (result) {
        // if business id is found remove business from favorites
        collection
          .updateOne({ userID: userID }, { $pull: { favorites: favorite } })
          .then((result) => {
            rsp_obj.message = "added to favorite";
            res.status(200).send(rsp_obj.message);
          })
          .catch((err) => {
            rsp_obj.message = "error - add to favorite failed";
            res.status(500).send(rsp_obj.message);
          });

        rsp_obj.message =
          "Business is already in favorites has now been removed";
        res.status(409).send(rsp_obj.message);
      } else {
        // if business is not in favorites try adding to favorites
        collection
          .updateOne({ userID: userID }, { $push: { favorites: favorite } })
          .then((result) => {
            rsp_obj.message = "added to favorite";
            res.status(200).send(rsp_obj.message);
          })
          .catch((err) => {
            rsp_obj.message = "error - add to favorite failed";
            res.status(500).send(rsp_obj.message);
          });
      }
    })
    .catch((err) => {
      rsp_obj.message = "error - issue finding business in favorites";
    });
});

//get user obj based on userID
app.get("/user/:userID", async function (req, res) {
  var id = req.params.userID;

  const cursor = await coll.findOne({ UID: id });
  return res.status(200).send(cursor);
});

// NEW get all favorite businesses of a user
app.get("/favorites/:userID", async function (req, res) {
  const userID = req.params.userID;

  try {
    const user = await collection.findOne({ userID: userID });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const favorites = user.favorites;
    return res.status(200).send(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

// NEW check if business exists in user favs returns response obj with isFavorite true or false
app.get("/isfav/:userID/:bizID", async function (req, res) {
  const userID = req.params.userID;
  const businessID = req.params.bizID;

  collection
    .findOne({ userID: userID, "favorites.id": businessID })
    .then((result) => {
      if (result) {
        res
          .status(200)
          .send({ isFavorite: true, message: "Business exists in favorites" });
      } else {
        res.status(200).send({
          isFavorite: false,
          message: "Business does not exist in favorites",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        isFavorite: false,
        message: "Error finding business in favorites",
      });
    });
});

//edit preferences
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

// NEW add a user profile for user for the first time.
app.post("/user/:userID", async function (req, res) {
  var userID = req.params.userID;

  collection
    .findOne({ userID: userID })
    .then((result) => {
      if (result) {
        // user exists in database
        res.status(200).send({ message: "user already exists" });
      } else {
        collection
          .insertOne({
            userID: id,
            favorites: [],
            trips: [],
            preferences: {
              hotel: [],
              breakfast: [],
              lunch: [],
              activity: [],
              dinner: [],
            },
          })
          .then((result) => {
            if (result) {
              // user profile created message can be changed
              res
                .status(200)
                .send({ message: "user profile created successfully" });
            } else {
              res.status(509).send({ message: "error creating user profile" });
            }
          })
          .catch((err) => {
            res.status(505).send({ message: "server error occurred" });
          });
      }
    })
    .catch((err) => {
      res.status(509).send({ message: "error finding user" });
    });
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
