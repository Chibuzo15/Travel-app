var path = require('path')
const express = require('express')
// const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const bodyParser = require('body-parser')

const aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();

const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests


app.post('/api', function (req, res) {
  console.log(req.body)

  textapi.sentiment({
    'text': req.body.text
  }, function (error, response) {
    if (error === null) {
      console.log(response);
      res.json(response);
    }
    else {
      console.log(error)
      res.status(400).send({
        error: "Something went wrong"
      })
    }
  });
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})