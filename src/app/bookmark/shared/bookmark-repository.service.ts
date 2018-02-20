import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        return this._http.post(this.URL, body);
    }

    /**
     * Update a bookmark
     * @param id _id of the bookmark
     * @param body bookmark to save
     */
    put(id: String, body: any): any {
        return this._http.put(this.URL + '/' + body._id, body);
    }

    /**
     * Delete a bookmark
     * @param id _id of the bookmark
     */
    delete(id: String): any {
        return this._http.delete(this.URL + '/' + id, {});
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
