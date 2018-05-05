import { PersistedResource } from '../../resource/shared/resource.types';

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
    resourceUrl: String;
}
