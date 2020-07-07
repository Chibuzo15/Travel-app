var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

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

//post route to add new entry
app.post('/add_new_info', (req, res) => {
  const temperature = req.body.temp
  const date = req.body.date
  const userResponse = req.body.feelings

  projectData = {
      temperature,
      date,
      userResponse
  }
  res.send(projectData)
})


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})