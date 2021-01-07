import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const sewerService = {
    getAll,
    getById,
    add,
    deleteById,
    updateById
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

const requestUpdateOptions = (body) => {
    return ({
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader()
        },
        body: body
    })
}

function getAll() {    
    return fetch(`http://localhost:3000/api/sewers`, requestOptions).then(handleResponse);
}

function getById(id) {    
    return fetch(`http://localhost:3000/api/sewers/${id}`, requestOptions).then(handleResponse);
}

function add(body) {
    return fetch(`http://localhost:3000/api/sewers/`, requestPostOptions(body)).then(handleResponse);
}

function deleteById(id) {
    return fetch(`http://localhost:3000/api/sewers/${id}`, requestDeleteOptions).then(handleResponse);
}

function updateById(id, body) {
    return fetch(`http://localhost:3000/api/sewers/${id}`, requestUpdateOptions(body)).then(handleResponse);
}