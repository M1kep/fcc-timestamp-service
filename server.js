// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
const {dateHandler} = require("./lib/handlers/api-date-handler");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/:date', dateHandler)
app.get('/api', (req, res) => {
    const date = new Date(Date.now());
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
