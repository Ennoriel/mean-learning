import { Injectable } from '@angular/core';

@Injectable()
export class MovieTypesService {

    constructor() { }

}

export class MovieWOConstructor {
    public title: string;
    public year?: number;
    public imdb?: string;
}

export class MovieWConstructor {
    constructor(
        title: string,
        year?: number,
        imdb?: string
    ) {}
}
