const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mqtt = require('./utils/mqttFunction');
require('dotenv').config();
global.WebSocket = require('ws');

// Import routes
const generalRoute = require('./routes/general.route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// Javascript library use
app.use(cors());

// Setting
app.set('port', process.env.PORT || 2048);

// Routes
app.use('/api', generalRoute);

// Databases connection
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {
        console.log("Connected to MongoDB!");
        run();
    }
);

run = async () => {
    await mqtt.startMQTTConnection();
    mqtt.setHaveNewSchedule(false);
    var scheduleInterval = setInterval(mqtt.sendMessageOnSchedule, 500);
};

// listen for requests :)
const listener = app.listen(app.get('port'), () => {
    console.log("Your app is listening on port " + listener.address().port);
});