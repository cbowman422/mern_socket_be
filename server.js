const express = require('express')
const app = express()

const http = require('http').Server(app);
const cors = require('cors')
const morgan = require('morgan')

//controller import
const authController = require("./controllers/auth");
const profileController = require('./controllers/profile-controller')
const chatController = require('./controllers/chat-controller')

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
app.use('/chat', chatController);



// adding socket io to project server to create real time connection
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

 //Listens and logs the message to the console
 socket.on('message', (data) => {
  console.log(data);
  socketIO.emit('messageResponse', data);
});

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});




app.get('/', (req, res) => res.redirect('/profile'))

http.listen(PORT, ()=> console.log("on port"))