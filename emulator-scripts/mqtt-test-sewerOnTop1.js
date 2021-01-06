/**
 * This script is to emulate a sewer
 * Sewer name: SewerA
 * Sewer id: sewerOnTop1
 */

const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var controlTopic = "sewerOnTop1/controller"
var infoTopic = "sewerOnTop1/info"
var id = "sewerOnTop1"
var sewerHeigh = 20;

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

    if (message.destinationName === controlTopic) {
        console.log("on " + controlTopic + " : " + message.payloadString);
        let control = message.payloadString;
        let controlLength = control.length;
        let controlExtract = control.slice(1, controlLength - 1);
        controlExtract = controlExtract.split(',');

        let distance = controlExtract[0];
        let cmd = controlExtract[1];
        console.log('distace: ' + (distance==0))
        console.log('cmd: ' + (cmd == 1))
        sewerRunning(distance, cmd)
    }
}

function sewerRunning(distance, cmd) {
    let currentDistance = sewerHeigh;
    let mode = "remote";
    let state = ["Moving down", "Moving up", "Staying still"];
    if (cmd == 0) {
        if (distance != 0) {
            setInterval(() => {
                if (currentDistance > (sewerHeigh-distance)) {
                    currentDistance--;
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[0]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);
                } else {
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[2]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);
                }
            }, 900)
        } else {
            setInterval(() => {
                if (currentDistance > 0) {
                    currentDistance--;
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[0]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);
                } else {
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[2]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);
                }
            }, 900)
        }
    }

    if (cmd == 1) {
        currentDistance = 0;
        if (distance != 0) {
            setInterval(() => {
                if (currentDistance < distance) {
                    currentDistance++;
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[1]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);
                    console.log(`${state[1]}: ${currentDistance}`)
                } else {
                    let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[2]}}`);
                    message.destinationName = infoTopic;
                    client.send(message);   
                    console.log(`${state[2]}`);            
                }
            }, 900)
        } else {
            if (currentDistance < sewerHeigh) {
                currentDistance++;
                let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[1]}}`);
                message.destinationName = infoTopic;
                client.send(message);
                console.log(`${state[cmd]}: ${currentDistance}`)
            } else {
                let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[2]}}`);
                message.destinationName = infoTopic;
                client.send(message);
                console.log(`${state[2]}`);
            }
        }
    }

    if (cmd == 2) {        
        setInterval(() => {
            if (currentDistance < sewerHeigh) {
                currentDistance++;
                let message = new Paho.Message(`{${currentDistance}, ${mode}, ${state[1]}}`);
                message.destinationName = infoTopic;
                client.send(message);
                console.log(`${state[cmd]}`);
            }
        }, 900)
    }
}