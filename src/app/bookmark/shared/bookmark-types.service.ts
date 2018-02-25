export interface PersistedBookmark {
    name?: String;
    imdb?: String;
    npm?: String;
    web?: String;
    _id: String;
}

export class PersistedBookmark implements PersistedBookmark {

    constructor(
        name?: String,
        imdb?: String,
        npm?: String,
        web?: String,
        _id?: String
    ) {
        if (name) {this.name = name; }
        if (imdb) {this.imdb = imdb; }
        if (npm) {this.npm = npm; }
        if (web) {this.web = web; }
        if (_id) {this._id = _id; }
    }

}

export class Bookmark {
    persisted: PersistedBookmark;
    showUpdateInputs: Boolean;

    constructor (bookmark?: PersistedBookmark) {
        this.persisted = bookmark;
    }
}
