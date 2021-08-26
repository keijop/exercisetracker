const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./db/connection')
require('dotenv').config()
const routes = require('./routes/routes.js')
const port = process.env.PORT || 3000

//middleware
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))

//routes
app.use('/api/users', routes)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const startServer = async () =>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Express server listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

startServer()
