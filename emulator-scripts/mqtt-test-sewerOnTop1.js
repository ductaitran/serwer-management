/**
 * This script is to emulate a sewer
 * Sewer name: SewerA
 * Sewer id: sewerOnTop1
 */

const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var controlTopic = "sewerOnTop1/controller"
var id = "sewerOnTop1"

var client = new Paho.Client("localhost", 4000, id);

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");

    // control plane    
    client.subscribe(controlTopic)


}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log(message.destinationName)

    if (message.destinationName === controlTopic)
        console.log("on " + controlTopic + " : " + message.payloadString);
}