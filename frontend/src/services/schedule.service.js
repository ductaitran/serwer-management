import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const scheduleService = {
    addSchedule,
    getAll,
    getById,
    deleteById
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

const requestDeleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
}

// get all schedule from db
function getAll() {
    return fetch(`http://localhost:3000/api/schedules/`, requestGetOptions).then(handleResponse);
}

// get schedule by sewer id from db
function getById(sewerId) {
    return fetch(`http://localhost:3000/api/schedules/${sewerId}`, requestGetOptions).then(handleResponse);
}

// add a new schedule 
function addSchedule(body) {
    return fetch(`http://localhost:3000/api/schedules/`, requestPostOptions(body)).then(handleResponse);
}

// delete a schedule by id
function deleteById(id) {
    return fetch(`http://localhost:3000/api/schedules/${id}`, requestDeleteOptions).then(handleResponse);
}