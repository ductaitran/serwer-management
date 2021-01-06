const Paho = require('./paho-mqtt');
global.WebSocket = require('ws');

var client = new Paho.Client("localhost", 4000, "clientIdTest9");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  // var topic = "sewerOnTop5/controller"
  var topic = "sewerOnTop5/info"
  client.subscribe(topic);
  message = new Paho.Message('{10, remote, state}');
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
  console.log(message.destinationName);
    console.log("onMessageArrived:" + message.payloadString);
}