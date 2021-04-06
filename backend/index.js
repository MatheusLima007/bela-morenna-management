const express = require('express')
const cors = require('cors')
const consign = require('consign')
const db = require('./config/db')
// const mongoose = require('mongoose')

const app = express()

// require('./config/mongodb')
app.use(express.json())
app.use(cors())
app.db = db
// app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./api/validation.js')
    .then('./api')
    // .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3333)