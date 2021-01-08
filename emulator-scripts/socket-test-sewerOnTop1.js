/**
 * This script is to emulate a sewer
 * Sewer name: SewerA
 * Sewer id: sewerOnTop1
 */

var socket = require('socket.io-client')('http://localhost:3000');

var streamChannel = 'sewerOnTop1/image-channel';
// var streamChannel = 'image-channel';

var counter = 0;

socket.on('connect', () => {
    console.log('connected: ' + socket.id);
    setInterval(() => {
        counter ++;        
        console.log('send to server: ' + counter);
        socket.emit(streamChannel, counter);
    }, 900)
});

socket.on('disconnect', () => {
    console.log('disconnected: ' + socket.id);
    counter = 0;
});