const scheduleModel = require('../models/schedule.model');
const sewerModel = require('../models/sewer.model');
const Paho = require('./paho-mqtt');

var schedules;

module.exports.startMQTTConnection = async () => {

    // Define hostname, port number and topic
    // var host = "104.155.233.176";
    var host = "192.168.1.10";
    var port = "4000";

    // Fetch schedule data
    schedules = await scheduleModel.find({});

    // Generate a random client ID
    clientID = "serverClientID_" + parseInt(Math.random() * 100);

    // Initialize new Paho client
    client = new Paho.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;

    // Connect the client, if successful, call onConnect function
    client.connect({
        onSuccess: onConnect
    });
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
    }
}

// Called when the client connects
async function onConnect() {
    // Check connection
    console.log("MQTT Connect Successful!");
    // Fetch the MQTT topic from the form
    var topic = "controller";
    // Fetch sewer list from database
    const sewerList = await sewerModel.find({}, '_id').distinct('_id');
    client.subscribe(topic);
    console.log("subcribed topic: " + topic);
    sewerList.forEach(element => {
        let temp = "/" + element + "/controller";
    // Subscribe to the requested topic
        client.subscribe(temp);
        console.log("subcribed topic: " + temp);
    });
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
}

function sendMessage(data, topic) {
    var message = new Paho.MQTT.Message(data);
    message.destinationName = topic;
    client.send(message);
    console.log('sending: ' + data);
}

module.exports.sendMessageOnSchedule = async () => {
    let timeStamp = Date.now();
    let dateObj = new Date(timeStamp);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();

    console.log("Checking schedules....");
    if (schedules.length > 0) {
        schedules.forEach( async (item, index) => {
            let scheduleId = item['id'];
            let scheduleDateArray = item['date'].split('-');
            let scheduleTimeArray = item['time'].split(':');
            let scheduleAction = item['action'];
            let scheduleSewer = item['sewer'];

            if ((day == scheduleDateArray[2]) && (month == scheduleDateArray[1]) && (year == scheduleDateArray[0])) {
                // console.log("sewer is scheduled today...");
                if (hour == scheduleTimeArray[0] && minute == scheduleTimeArray[1]) {
                    // control sewer
                    // check if real sewer or not
                    if (scheduleSewer == "realSewer") {
                        sendMessage(`{0,${scheduleAction}}`, "controller");
                        schedules.splice(index, 1);
                    }
                    else {
                        sendMessage(`{0,${scheduleAction}}`, `/${scheduleSewer}/controller`);
                        schedules.splice(index, 1);
                    }

                    // send request to remove schedule
                    const removedSchedule = await scheduleModel.remove({_id: scheduleId});

                    isScheduleHandled = true;
                }
            }
        })
    }
};
