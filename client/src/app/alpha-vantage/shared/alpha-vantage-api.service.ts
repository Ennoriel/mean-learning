import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlphaVantageApiService {

    URL = 'https://www.alphavantage.co/query?';

    constructor( private _http: HttpClient ) { }

    get (serieQuery): any {
        return this._http.get(this.URL + serieQuery);
    }

}

