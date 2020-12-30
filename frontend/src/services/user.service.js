import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getAll,
    getOne
}

const requestOptions = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authHeader()
    }
}

function getAll() {

    console.log(authHeader())

    return fetch(`http://localhost:3000/api/users`, requestOptions).then(handleResponse);
}

function getOne(email) {
    console.log(requestOptions)
    return fetch(`http://localhost:3000/api/users/${email}`, requestOptions).then(handleResponse);
}