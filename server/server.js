const express = require('express');
const router = express.Router();
const app = require('express')();
const http = require('http').Server(app);
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
});

// Require socket modules
const clientSockets = require('./sockets/client-socket');

// Require routes
const authRoutes = require('./routes/authentication');

// Set up for development and production enviornments
const PORT = process.env.PORT || 5000;
dotenv.config();

//View engine
app.set('view engine', 'ejs');

//Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use(express.json()) ;
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));

//Set basic routes
app.get('/', (req, res) => {
  res.send('Just the back-end route for controllers and other route handling');
});

//Client API routes
app.use('/auth', authRoutes);

//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ID, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(result => {
      //Create instance of socket connection to the client
      io.on('connection', socket => {
        // Link socket emmiters and listeners from the required modules
        clientSockets(socket);
      })
      http.listen(PORT);
    })
    .then(console.log("Connected to MongoDB Successfully!"))
    .catch(err => console.log(err));
  } catch(err) {
    console.error(err);
  }
};

connectDB();