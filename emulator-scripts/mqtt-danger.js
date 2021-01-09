const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var client = new Paho.Client("localhost", 4000, "clientIdTest978");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("sewerOnTop5/danger");
  message = new Paho.Message('1');
  message.destinationName = "sewerOnTop5/is_danger";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log("Channel: " + message.destinationName);
    console.log("onMessageArrived:" + message.payloadString);
}