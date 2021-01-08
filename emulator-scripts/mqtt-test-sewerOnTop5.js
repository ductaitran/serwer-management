/**
 * This script is to emulate a sewer
 * Sewer name: SewerSG
 * Sewer id: sewerOnTop5
 */

const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var controlTopic = "sewerOnTop5/controller"
var infoTopic = "sewerOnTop5/info"
var id = "sewerOnTop5"

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
    client.subscribe(infoTopic)

    // sendInfoMessage();
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
var counter; //
var interval = 1; //
function onMessageArrived(message) {
    console.log(message.destinationName)

    if (message.destinationName === controlTopic) {
        console.log("on " + controlTopic + " : " + message.payloadString);
        let info = message.payloadString
        let infoLength = info.length;
        let infoExtract = info.slice(1, infoLength - 1);
        infoExtract = infoExtract.split(',');
        // let dist = infoExtract[0];
        let action = infoExtract[1];        
        clearInterval(interval);
        sendInfoMessage(action)
    }

}

function sendInfoMessage(action) {
    let mode = "remote";
    let state = ["Moving down", "Moving up", "Staying still"];
    // let interVal = 1;

    // open
    if (action == 1) {        
        if (!counter) { counter = 0 }
        interval = setInterval(() => {
            if (counter < 20) {
                counter = counter + 1;

                let message = new Paho.Message(`{${counter}, ${mode}, ${state[1]}}`);
                message.destinationName = infoTopic;
                message.qos = 2;
                client.send(message);
                console.log(`{${counter}, ${mode}, ${state[1]}}`);
            } else {
                clearInterval(interval);
            }
        }, 2000)
    }

    // close 
    if (action == 0) {        
        if (!counter) { counter = 20 }
        console.log(counter);
        interval = setInterval(() => {
            if (counter > 0) {
                counter = counter - 1;

                let message = new Paho.Message(`{${counter}, ${mode}, ${state[0]}}`);
                message.destinationName = infoTopic;
                message.qos = 2;
                client.send(message);
                console.log(`{${counter}, ${mode}, ${state[0]}}`);
            } else {
                clearInterval(interval);
            }
        }, 2000)
    }

    // stop
    if (action == 2) {     
        let message = new Paho.Message(`{${counter}, ${mode}, ${state[2]}}`);
        message.destinationName = infoTopic;
        message.qos = 0;
        client.send(message);
        console.log(`{${counter}, ${mode}, ${state[2]}}`);
    }
}