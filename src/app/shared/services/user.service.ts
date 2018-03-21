import { Injectable } from '@angular/core';
import { appConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    /**
     * Get all users
     */
    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    /**
     * Get a user by its _id
     * @param _id _id
     */
    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + _id);
    }

    /**
     * Create a user
     * @param user user
     */
    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    /**
     * Update a user
     * @param user user
     */
    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user);
    }

    /**
     * delete a user
     * @param _id _id
     */
    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + _id);
    }

}
