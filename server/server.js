const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

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
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));