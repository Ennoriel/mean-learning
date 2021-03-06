import { Component, OnInit } from '@angular/core';
import { BookmarkRepositoryService } from './shared/bookmark-repository.service';
import { PersistedBookmark, Bookmark, BookmarkSO } from './shared/bookmark-types.service';
import { PersistedResource } from '../resource/shared/resource.types';

/**
 * CRUD Repository for the bookmarks
 */
@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

    bookmarkToSearch: BookmarkSO;

    savedBookmarks: Array<Bookmark>;
    searchedBookmarks: Array<Bookmark>;

    showSaveSpinner: Boolean;
    showSearchSpinner: Boolean;

    constructor(
        private _bookmarkRepositoryService: BookmarkRepositoryService
    ) { }

    ngOnInit() {
        this.initSearch();
    }

    /**
     * When a bookmark is saved, display it on the specific secition
     * @param $event the bookmark newly saved
     */
    displayBookmarkSaved($event: PersistedBookmark): void {
        if (!this.savedBookmarks) {
            this.savedBookmarks = [];
        }
        this.savedBookmarks.push(new Bookmark($event));
    }

    /**
     * When a bookmark is updated, update it on the searched list
     * @param $event the bookmark newly saved
     */
    displayBookmarkUpdated($event: PersistedBookmark): void {
        this.searchedBookmarks.forEach(bookmark => {
            if (bookmark.persisted._id === $event._id) {
                Object.assign(bookmark.persisted, $event);
                delete bookmark.showUpdateInputs;
            }
        });
    }

    /**
     * Initialize and reinitialize the search objects to be empty
     */
    initSearch(): void {
        this.bookmarkToSearch = new BookmarkSO();
        this.showSearchSpinner = false;
    }

    /**
     * Search bookmarks into the DB
     */
    searchBookmarks(): void {
        this.showSearchSpinner = true;
        this._bookmarkRepositoryService.get(this.bookmarkToSearch).subscribe(resultList => {
            this.searchedBookmarks = resultList.map(result => new Bookmark(result));
            this.showSearchSpinner = false;
        },
        error => {
        this.showSearchSpinner = false;
            alert(error);
        });
    }

    /**
     * Display the update field
     * @param bookmark the bookmark to be updated
     */
    showUpdateForm(bookmark: Bookmark): void {
        bookmark.showUpdateInputs = true;
    }

    /**
     * Delete a bookmark
     * @param bookmark the bookmark to be deleted
     * @param index the index of the bookmark in the array displayed
     */
    deleteBookmark(bookmark: Bookmark, index: number): void {
        this._bookmarkRepositoryService.delete(bookmark.persisted._id).subscribe(_ => {
            this.searchedBookmarks.splice(index, 1);
        },
        error => {
            alert(error);
        });
    }

    showUpdateResourceForm(id: String, resource: PersistedResource) {

    }
}
