import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookmarkRepositoryService {

    URL = 'http://127.0.0.1:3000/bookmark';

    constructor( private _http: HttpClient ) { }

    /**
     * Search bookmarks
     * @param body criterias
     */
    get(body: any): any {
        return this._http.get(this._getQueryString(this.URL, body));
    }

    /**
     * Save a bookmark
     * @param bookmark bookmark
     */
    post(body): any {
        return this._http
            .post(this.URL, body)
            .map(res => res)
            .catch(this._handleError);
    }

    /**
     * Update a bookmark
     * @param id _id of the bookmark
     * @param body bookmark to save
     */
    put(id: String, body: any): any {
        return this._http
            .put(this.URL + '/' + body._id, body)
            .pipe(catchError(this._handleError));
    }

    /**
     * Delete a bookmark
     * @param id _id of the bookmark
     */
    delete(id: String): any {
        return this._http.delete(this.URL + '/' + id, {});
    }

    /**
     * Create the string with path parameter for the GET request
     * @param url base url
     * @param params params to be added on the final URL {key: value, ...}
     */
    _getQueryString(url: String, params: Object): string {
        let queryString = url + '?';
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                queryString += key + '=' + params[key] + '&';
            }
        }
        return queryString;
    }

    /**
     * Handle Error method
     * @param httpError the http error response
     */
    private _handleError(httpError: HttpErrorResponse) {
        if (httpError.status === 400 && httpError.error.message) {
            return Observable.throw(httpError.error.message);
        }
        if (httpError.status === 0) {
            return Observable.throw('The app can\'t access the server. Feel lucky?');
        }
        return Observable.throw('An unkown error poped. Feel lucky?');
      }
}
