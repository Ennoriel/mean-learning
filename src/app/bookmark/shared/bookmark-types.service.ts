export interface PersistedResource {
    name?: String;
    link?: String;
}

export class PersistedResource implements PersistedResource {
    name?: String;
    link?: String;

    constructor () {
    }
}

export interface PersistedBookmark {
    name?: String;
    resources?: Array<PersistedResource>;
    _id: String;
}

export class PersistedBookmark implements PersistedBookmark {

    constructor () {
        this.resources = [new PersistedResource()];
    }
}

export class Bookmark {
    persisted: PersistedBookmark;
    showUpdateInputs: Boolean;

    constructor (bookmark?: PersistedBookmark) {
        this.persisted = bookmark;
    }
}

export class BookmarkSO {
    name: String;
    resourceName: String;
    resourceLink: String;
}
