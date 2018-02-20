import { Injectable } from '@angular/core';

@Injectable()
export class BookmarkTypesService {

    constructor() { }

}

export class BookmarkWOConstructor {
    public title: string;
    public year?: number;
    public imdb?: string;
}

export class BookmarkWConstructor {
    constructor(
        title: string,
        year?: number,
        imdb?: string
    ) {}
}
