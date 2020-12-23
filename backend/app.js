const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const sewersRoute = require('./routes/sewers.route.js');
const usersRoute = require('./routes/users.route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Setting
app.set('port', process.env.PORT || 9870);

// Routes
app.use('/sewers', sewersRoute);
app.use('/users', usersRoute);


// Databases connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("Connected to DB!")
);

// listen for requests :)
const listener = app.listen(app.get('port'), () => {
    console.log("Your app is listening on port " + listener.address().port);
  });