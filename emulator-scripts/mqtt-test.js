const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var client = new Paho.Client("localhost", 4000, "clientIdTest1");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  var topic = "test"
  client.subscribe(topic);
  client.subscribe('controller');
  message = new Paho.Message("Hello");
  message.destinationName = topic;
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
    console.log("onMessageArrived:" + message.payloadString);
}