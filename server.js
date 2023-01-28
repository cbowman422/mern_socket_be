const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

//controller import
const authController = require("./controllers/auth");
const profileController = require('./controllers/profile-controller')

require('dotenv').config()
require('./config/db.connection')

const { PORT } = process.env

// express, cors, morgan
app.use(cors())
app.use(morgan('dev'))

// route middleware
app.use(express.json())
app.use('/auth', authController);
app.use('/profile', profileController);


app.get('/', (req, res) => res.redirect('/profile'))

app.listen(PORT, ()=> console.log("on port"))