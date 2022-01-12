const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views/'));

//Middleware
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use(express.json()) ;
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));