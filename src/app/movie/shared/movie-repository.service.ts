import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieRepositoryService {

    URL = 'http://127.0.0.1:3000/movie';

    constructor( private _http: HttpClient ) { }

    get(body): any {
        return this._http.get(this._getQueryString(this.URL, body));
    }

    post(body): any {
        return this._http.post(this.URL, body);
    }

    _getQueryString(url: String, params: Object): string {
        let queryString = url + '?';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                queryString += key + '=' + params[key] + '&';
            }
        }
        return queryString;
    }
}
