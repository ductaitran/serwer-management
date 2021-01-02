import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const scheduleService = {
    addSchedule,
    getAll
}

const requestGetOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
}

const requestPostOptions = (body) => {
    return ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: body
    })
}

// get all schedule from db
function getAll() {
    return fetch(`http://localhost:3000/api/schedules/`, requestGetOptions).then(handleResponse);
}

// add a new schedule 
function addSchedule(body) {
    return fetch(`http://localhost:3000/api/schedules/`, requestPostOptions(body)).then(handleResponse);
}