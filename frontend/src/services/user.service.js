import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getAll,
    getByEmail,
    register
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

const requestRegisterOptions = (body) => {
    // console.log(body);
    return ({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
        },
        body: body
    })
}

function getAll() {

    // console.log(authHeader())

    return fetch(`http://localhost:3000/api/users`, requestGetOptions).then(handleResponse);
}

function getByEmail(email) {
    // console.log(requestGetOptions)
    return fetch(`http://localhost:3000/api/users/${email}`, requestGetOptions).then(handleResponse);
}

function register(body) {
    return fetch(`http://localhost:3000/api/register/`, requestRegisterOptions(body)).then(handleResponse);
}