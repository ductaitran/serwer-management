import { authenticationService } from '../services/authentication.service';

export function authHeader() {
    // return authorization header with jwt token
    // console.log(authenticationService.currentUserValue);
    const currentUser = JSON.parse(authenticationService.currentUserValue);    
    if (currentUser && currentUser.accessToken) {
        // console.log(currentUser.accessToken);
        // return { Authorization: `Bearer ${currentUser.accessToken}` };
        return `Bearer ${currentUser.accessToken}`;
    } else {
        return '';
    }
}