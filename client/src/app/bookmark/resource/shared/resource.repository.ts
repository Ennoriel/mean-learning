import { Injectable } from '@angular/core';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PersistedResource, Resource } from './resource.types';
import { BookmarkSO, PersistedBookmark } from '../../bookmark/shared/bookmark-types.service';
import { HttpHelper } from '../../../shared/services/helpers/http.helper';
import { forkJoin } from 'rxjs/observable/forkJoin';

/**
 * CRUD Repository for the resources
 */
@Injectable()
export class ResourceRepository {

    URL = appConfig.apiUrl + '/bookmark';

    constructor(
        private _http: HttpClient,
        private _httpHelper: HttpHelper
    ) { }

    /**
     * Search resources of a bookmark
     * @param bookmarkId bookmark Id
     */
    getAll(bookmarkId): Observable<Array<PersistedResource>> {
        return this._http
            .get<Array<PersistedResource>>(this.URL + '/' + bookmarkId + '/resources')
            .map(res => res)
            .catch(this._handleError);
    }

    /**
     * Search resources
     * @param resourceToSearch criterias
     */
    search(resourceToSearch: BookmarkSO): Observable<Array<any>> {
        return this._http
            .get<Array<any>>(
                this.URL + '/resources',
                {params: this._httpHelper.getGetParam(resourceToSearch)}
            )
            .map(res => res)
            .catch(this._handleError);
    }

    /**
     * Add a resource to a bookmark
     * @param bookmarkId bookmark id
     * @param resource resource to add
     */
    add(bookmarkId, resource: PersistedResource): Observable<Object> {
        return this._http
            .post<Array<PersistedResource>>(this.URL + '/' + bookmarkId + '/resources', resource)
            .map(res => res)
            .catch(this._handleError);
    }

    /**
     * Update the resource of a bookmark
     * @param bookmarkId bookmark id
     * @param resourceName resource name
     * @param resource resource to update
     */
    updateInfos(bookmarkId, resourceName, resource: PersistedResource): Observable<Object> {
        return this._http
            .put<Array<PersistedResource>>(this.URL + '/' + bookmarkId + '/resource/' + resourceName, resource)
            .map(res => res)
            .catch(this._handleError);
    }

    /**
     * Change the resource of a bookmark
     * @param oldResource old resource
     * @param newResource new resource
     * @returns an observable of an array [0 => result of deletion method, 1 => result of creation method]
     */
    updateBookmark(oldResource: Resource, newResource: Resource): Observable<Object> {
        return forkJoin(
                this.delete(oldResource._id, oldResource.resource.name),
                this.add(newResource._id, newResource.resource)
            );
    }

    /**
     * Delete a resorce
     * @param bookmarkId _id of the bookmark the resource is attached to
     * @param resourceName name of the resource
     */
    delete(bookmarkId: String, resourceName: String): any {
        return this._http.delete(this.URL + '/' + bookmarkId + '/resource/' + resourceName, {});
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
