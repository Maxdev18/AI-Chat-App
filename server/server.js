const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
dotenv.config();

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../admin-back-end/views/'));

//Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
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


//Admin API Routes


//Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ID, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(result => app.listen(PORT))
    .then(console.log("Connected to MongoDB Successfully!"))
    .catch(err => console.log(err));
  } catch(err) {
    console.error(err);
  }
};

connectDB();