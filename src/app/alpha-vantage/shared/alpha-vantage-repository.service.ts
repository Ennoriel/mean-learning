import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlphaVantageRepositoryService {

    URL = 'http://127.0.0.1:3000/apiVantageApiKey';

    constructor( private _http: HttpClient ) { }

    getApiKey (): any {
        return this._http.get(this.URL);
    }

}
