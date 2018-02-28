export interface Url {
    name?: String;
    link?: String;
}

export interface PersistedBookmark {
    name?: String;
    github?: String;
    url?: Array<Url>;
    web?: String;
    _id: String;
}

export class PersistedBookmark implements PersistedBookmark {

    constructor(
    ) {
        this.url = new Array();
    }
}

export class Bookmark {
    persisted: PersistedBookmark;
    showUpdateInputs: Boolean;

    constructor (bookmark?: PersistedBookmark) {
        this.persisted = bookmark;
    }
}
