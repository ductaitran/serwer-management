var socket = require('socket.io-client')('http://localhost:3000');

var counter = 0;

socket.on('connect', () => {
    console.log('connected: ' + socket.id);
    setInterval(() => {
        counter ++;        
        console.log('send to server: ' + counter);
        socket.emit('image-channel', counter);
    }, 900)
});

socket.on('disconnect', () => {
    console.log('disconnected: ' + socket.id);
    counter = 0;
});