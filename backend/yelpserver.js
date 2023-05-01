//load keys from the .env file
require('dotenv').config()

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient } = require('mongodb');
const uri = process.env.URI
const mongoClient = new MongoClient(uri);
mongoClient.connect();
const db = mongoClient.db('odyssey');
const coll = db.collection('users');


const yelp = require('yelp-fusion');
const client = yelp.client(process.env.yelpAPIkey);

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

'use strict';

//Endpoint for searching businesses based on:
//  -term(food, hotel, etc.)
//  -location(zipcode, city, etc.)
//  *It is possible to include more search params like price/category
app.get('/search/:term/:location', async function (req, res) {
  const searchTerm = req.params.term;
  const searchLocation = req.params.location

  client.search({
    term: searchTerm,
    location: searchLocation,
  }).then(response => {
    return res.status(200).send(response.jsonBody.businesses);
  }).catch(e => {
    console.log(e);
  });

});

//Endpoint to retrieve business details by using biz ID or Alias.
app.get('/biz/:id', async function(req, res) {
  const bizID = req.params.id;

  client.business(bizID)
  .then(response => {
    return res.status(200).send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });
});

//Endpoint to retrieve 3 reviews from biz ID
//Also possible to change the sort_by param to sort by newest instead of default
app.get('/biz/:id/reviews', async function(req, res) {
  const bizID = req.params.id;

  client.reviews(bizID)
  .then(response => {
    return res.status(200).send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });
})

//Endpoint to retrieve yelp search categories/terms based on input text
//May need to account for spaces in string input
app.get('/auto/:text', async function(req, res) {
  const autoText = req.params.text;

  client.autocomplete({
    text: autoText
  }).then(response => {
    return res.status(200).send(response.jsonBody);
  }).catch(e => {
    console.log(e);
  });  
})

app.listen(port || 8000); //start the server
console.log(`Server is running at port ${port || 8000}`);