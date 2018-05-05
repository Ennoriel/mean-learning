import { Component, OnInit } from '@angular/core';
import { BookmarkSO, Bookmark, PersistedBookmark } from '../../bookmark/shared/bookmark-types.service';
import { ResourceRepository } from '../shared/resource.repository';
import { Resource, PersistedResource } from '../shared/resource.types';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

    resourceToSearch: BookmarkSO;
    searchedResources: Array<Resource>;
    savedResources: Array<Resource>;

    showSearchSpinner: Boolean;

    constructor(
        private _resourceRepository: ResourceRepository
    ) { }

    ngOnInit() {
        this.initSearch();
    }

    initSearch() {
        this.resourceToSearch = new BookmarkSO();
    }

    searchResources() {
        this.showSearchSpinner = true;
        this._resourceRepository.search(this.resourceToSearch).subscribe(resultList => {
          this.searchedResources = resultList.map(result => new Resource(result._id, result.resources));
          this.showSearchSpinner = false;
        },
        error => {
          this.showSearchSpinner = false;
          alert(error);
        });
    }

    showUpdateForm(resource: Resource) {
        this.searchedResources.forEach(searchedResource => { delete searchedResource.showUpdateInputs; });
        resource.showUpdateInputs = true;
    }

    /**
     * When a resource is saved, display it on the specific secition
     * @param {PersistedResource} $event the resource newly saved
     */
    displayResourceSaved($event: any): void {
        if (!this.savedResources) {
            this.savedResources = [];
        }
        this.savedResources.push($event);
    }

    displayResourceUpdated($event: Resource): void {
        console.log($event);
        this.searchedResources.forEach((resource, index) => {
            if (resource.showUpdateInputs) {
                resource._id = $event._id;
                resource.resource.name = $event.resource.name;
                resource.resource.link = $event.resource.link;
                delete resource.showUpdateInputs;
            }
        });
    }

    deleteResource(resource: Resource, index: number) {
        this._resourceRepository.delete(resource._id, resource.resource.name).subscribe(_ => {
                this.searchedResources.splice(index, 1);
            },
            error => {
                alert(error);
            });
    }

}
