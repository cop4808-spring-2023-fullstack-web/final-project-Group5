const express = require('express');
const cors = require('cors');
const yelp = require('yelp-fusion');
const client = yelp.client('QZ3xgDfBqmHGO_ION1xXEnRam_jtdNlWQi6VG0uqEYZqWAfQyfdWs-8Lk4n__W6PJowWzlTn7K4l6WGJllYpcH30bTbRTMGMNVMob9suywW_w6CpN3EoDsc3gt8wZHYx');

const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

'use strict';

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



app.listen(port || 8000); //start the server
console.log(`Server is running at port ${port || 8000}`);