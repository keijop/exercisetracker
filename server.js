const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connection')
require('dotenv').config()
const createUser = require('./controllers/createUser.js')
const getUsers = require('./controllers/getUsers.js')
const logExercise = require('./controllers/logExercise.js')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', getUsers)

app.get('/api/users/:_id/logs', (req,res) => {
  res.json({
  username: "fcc_test",
  count: 1,
  _id: "5fd01a41c5b5cf05d080502f",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
  })
})

app.post('/api/users', createUser)

app.post('/api/users/:_id/exercises', logExercise)

const startServer = async () =>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Express server listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
