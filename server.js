// Express allows you to define routes of your application based on HTTP methods and URLs. 
const express = require('express')
const app = express()

// use http.Server() to create a server.
// calls http.Server() internally and returns the resulting instance.
const http = require('http').Server(app);

// cors and morgan imports
const cors = require('cors')
const morgan = require('morgan')

//controller import
// set controller routes to variables to be set into middleware
const authController = require("./controllers/auth");
const profileController = require('./controllers/profile-controller')
const chatController = require('./controllers/chat-controller')

// dotenv import
require('dotenv').config()

// imports mongo database connection file that uses mongoose for connection events
require('./config/db.connection')

// runs PORT through .env file
const { PORT } = process.env

// express, cors, morgan
//app. use() function is used to mount the specified middleware function ( the functions that have access to the request object and response object, or we can call it a response-request cycle) at the path which is being specified.
app.use(cors())
app.use(morgan('dev'))

// "middleware" - code that runs before the final route call back. They are in the middle between the beginning of the route and the callback function.
// software that acts as a bridge between an operating system or database and applications, especially on a network.
// route middleware - setting route paths to controller routes
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
// on the sever instance bind to socket 'connection' event and provide socket as argument 
// when a user comes onto the server they get connected to a socket and given a socket id and information
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

 // socket binds on to message event and provides data from message client
 // socket fires message response returning un altered data
 socket.on('message', (data) => {
  console.log(data);
  socketIO.emit('messageResponse', data);
  });


  // socket binds on pre built in socket 'disconnect' event and provides console messaage when user disconnects
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});





// The Lambda function handler is the method in your function code that processes events. When your function is invoked, Lambda runs the handler method. When the handler exits or returns a response, it becomes available to handle another event.
// Express initializes app to be a function handler that you can supply to an HTTP server 
app.get('/', (req, res) => res.redirect('/profile'))


// http event listener for connecting to port
// listen on http and set port to http then returns message to console
http.listen(PORT, ()=> console.log("on port"))