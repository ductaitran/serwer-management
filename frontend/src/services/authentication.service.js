import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    signin,
    signout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function signin(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://localhost:3000/api/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        })
    // console.log('from authen service: ' + email + ' ' + password);
    // localStorage.setItem('currentUser', JSON.stringify({'email': email, 'password': password}));    
    // currentUserSubject.next({'email': email, 'password': password});
}

function signout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}