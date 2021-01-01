import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const sewerService = {
    getAll,
    getById
}

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
}

function getAll() {    
    return fetch(`http://localhost:3000/api/sewers`, requestOptions).then(handleResponse);
}

function getById(id) {
    console.log(requestOptions)
    return fetch(`http://localhost:3000/api/sewers/${id}`, requestOptions).then(handleResponse);
}