const userModel = require('../models/user.model');
const locationModel = require('../models/location.model');
const scheduleModel = require('../models/schedule.model');
const sewerModel = require('../models/sewer.model');

const fs = require('fs');

var users, locations, schedules, sewers;

getData = async () => {
    users = await userModel.find().lean();
    locations = await locationModel.find().lean();
    schedules = await scheduleModel.find().lean();
    sewers = await sewerModel.find().lean();
}

module.exports.writeToFile = async () => {
    await getData();
    fs.writeFileSync('./debug/usersDatabase.json', JSON.stringify(users, null, 2));
    fs.writeFileSync('./debug/locationsDatabase.json', JSON.stringify(locations, null, 2));
    fs.writeFileSync('./debug/sewersDatabase.json', JSON.stringify(sewers, null, 2));
    fs.writeFileSync('./debug/schedulessDatabase.json', JSON.stringify(schedules, null, 2));
}