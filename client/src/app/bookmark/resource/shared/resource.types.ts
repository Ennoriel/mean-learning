export interface PersistedResource {
    name?: String;
    link?: String;
}

export class PersistedResource implements PersistedResource {
    name?: String;
    link?: String;

    constructor (persistedResource?: PersistedResource) {
        this.name = persistedResource ? persistedResource.name : undefined;
        this.link = persistedResource ? persistedResource.link : undefined;
    }
}

export class Resource {
    _id: String;
    // name: String;
    resource: PersistedResource;
    showUpdateInputs: Boolean;

    constructor (resourceId?: String, resource?: PersistedResource) {
        this._id = resourceId;
        this.resource = (resource ? new PersistedResource(resource) : new PersistedResource());
    }
}
