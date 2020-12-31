const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

// Import routes
const generalRoute = require('./routes/general.route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Setting
app.set('port', process.env.PORT || 2048);

// Routes
app.use('/api', generalRoute);

// Databases connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to MongoDB!")
);

// listen for requests :)
const listener = app.listen(app.get('port'), () => {
    console.log("Your app is listening on port " + listener.address().port);
  });