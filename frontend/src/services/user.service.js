import { func } from 'prop-types';
import { get } from '../../../backend/routes/users.route';
import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

export const userService = {
    getAll
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:3000/api/users`, requestOptions).then(handleResponse);
}