import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';

@Injectable()
export class AlphaVantageRepositoryService {

    URL = appConfig.apiUrl + '/apiVantageApiKey';

    constructor( private _http: HttpClient ) { }

    getApiKey (): any {
        return this._http.get(this.URL);
    }

}
