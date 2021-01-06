import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const locationService = {
    getAll,
    getDistrictByCity,
    add,
    // deleteById,
    // updateById
}

const requestOptions = {
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

const requestUpdateOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
}

function getAll() {    
    return fetch(`http://localhost:3000/api/locations`, requestOptions).then(handleResponse);
}

function getDistrictByCity(city) {    
    return fetch(`http://localhost:3000/api/locations/${city}`, requestOptions).then(handleResponse);
}

function add(body) {
    return fetch(`http://localhost:3000/api/locations/`, requestPostOptions(body)).then(handleResponse);
}

// function deleteById(id) {
//     return fetch(`http://localhost:3000/api/locations/${id}`, requestDeleteOptions).then(handleResponse);
// }

// function updateById(id) {
//     return fetch(`http://localhost:3000/api/locations/${id}`, requestUpdateOptions).then(handleResponse);
// }