const express = require('express');
const bodyParser = require('body-parser');
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chattingai-frontend.herokuapp.com"],
    credentials: true
  }});

// Require socket handlers
const messageSocketHandler = require('./sockets/socket');

// Require routes
const authRoutes = require('./routes/authentication');
const roomRoutes = require('./routes/room.router');
const messageRoutes = require('./routes/message.router');
const updateRoutes = require('./routes/update.router');

// Set up for development and production enviornments
const PORT = process.env.PORT || 5000;
dotenv.config();

//View engine
app.set('view engine', 'ejs');

//Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://chattingai-frontend.herokuapp.com"],
    credentials: true
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json()) ;
app.use(express.static('client'));

//Set basic routes
app.get('/', (req, res) => {
  res.send('Just the back-end route for controllers and other route handling');
});

//API routes
app.use('/auth',authRoutes);
app.use('/api/application/rooms', roomRoutes);
app.use('/api/application/messages', messageRoutes);
app.use('/api/application/update', updateRoutes);

//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ID, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      //Create instance of socket connection to the client
      const onConnection = socket => {
        console.log("Socket has been established...");
        messageSocketHandler(io, socket);
      }
      
      io.on('connection', onConnection);
      server.listen(PORT);
    })
    .then(console.log("Connected to MongoDB Successfully!"))
    .catch(err => console.log(err));
  } catch(err) {
    console.error(err);
  }
};

connectDB();