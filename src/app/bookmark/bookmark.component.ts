import { Component, OnInit } from '@angular/core';
import { BookmarkRepositoryService } from './shared/bookmark-repository.service';
import { PersistedBookmark, Bookmark } from './shared/bookmark-types.service';

/**
 * Component used as a CRUD example with bookmarks
 */
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  bookmarkToSearch: PersistedBookmark;

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
      }});
  }

  /**
   * Initialize and reinitialize the search objects to be empty
   */
  initSearch(): void {
    this.bookmarkToSearch = new PersistedBookmark();
    console.log(this.searchedBookmarks);
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
    console.log(bookmark.persisted._id);
    this._bookmarkRepositoryService.delete(bookmark.persisted._id).subscribe(_ => {
      this.searchedBookmarks.splice(index, 1);
    },
    error => {
      alert(error);
    });
  }
}
