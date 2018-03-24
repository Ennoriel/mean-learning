import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { appConfig } from '../../app.config';

@Injectable()
export class AuthenticationService {

    LS_USER = 'currentUser';

    constructor(private http: HttpClient) { }

    /**
     * Log in a user
     * @param username username
     * @param password password
     */
    login(username: string, password: string) {
        return this.http.post<any>(appConfig.apiUrl + '/users/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.LS_USER, JSON.stringify(user));
                }

                return user;
            });
    }

    /**
     * Logout a user
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.LS_USER);
    }

    /**
     * Check whether the user is logged or not
     */
    isLogged() {
        return localStorage.getItem(this.LS_USER) !== null;
    }

    /**
     * Get the logged user
     */
    getLoggedUser() {
        return JSON.parse(localStorage.getItem(this.LS_USER));
    }
}
