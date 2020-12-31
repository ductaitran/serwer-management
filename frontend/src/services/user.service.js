import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getAll,
    getByEmail
}

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader()
    }
}

function getAll() {

    // console.log(authHeader())

    return fetch(`http://localhost:3000/api/users`, requestOptions).then(handleResponse);
}

function getByEmail(email) {
    console.log(requestOptions)
    return fetch(`http://localhost:3000/api/users/${email}`, requestOptions).then(handleResponse);
}