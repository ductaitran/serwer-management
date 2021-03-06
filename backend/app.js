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

// Debug functions
const { writeToFile } = require('./debug/toFile');

// Socketio help functions
const { getAllSewerId } = require('./controllers/sewers.controller');

// Socketio
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    pingInterval: 10000,
    pingTimeout: 50000,
});

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
    var sewerIdList = await getAllSewerId();
    var scheduleInterval = setInterval(mqtt.sendMessageOnSchedule, 500);
    // Socketio connection
    io.on('connection', (socket) => {
        console.log('socket client connected | ' + socket.id);
        sewerIdList.forEach(element => {
            socket.on(`${element}/image-channel`, img => {
                // console.log(img);
                io.emit(`${element}/imageSend`, img);
                // io.emit('received', 1);
            });
        })

        socket.on(`image-channel`, img => {
            // console.log(img);
            io.emit(`imageSend`, img);
            // io.emit('received', 1);
        });

        socket.on('connect_failed', function(err){
            console.log('connection failed: ',err);
        });

        socket.on('error', function(err){
            console.log('error: ', err);
        });

        socket.on('disconnect', () => {
            console.log('socket client disconnected | ' + socket.id);
        });
    });
};

// Conflict with nodemon, if you want to get newest database: run it one time then comment it again.
// writeToFile();

// listen for requests :)
const listener = server.listen(app.get('port'), () => {
    console.log("Your app is listening on port " + listener.address().port);
});