import { Component, OnInit } from '@angular/core';
import { BookmarkRepositoryService } from './shared/bookmark-repository.service';

/**
 * Component used as a CRUD example with bookmarks
 */
@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  bookmarkToSearch;

  savedBookmarks;
  searchedBookmarks;

  showSaveSpinner;
  showSearchSpinner;

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
  displayBookmarkSaved($event) {
    if (this.savedBookmarks) {
      this.savedBookmarks.push($event);
    } else {
      this.savedBookmarks = [$event];
    }
  }

  /**
   * When a bookmark is updated, update it on the searched list
   * @param $event the bookmark newly saved
   */
  displayBookmarkUpdated($event) {
    this.searchedBookmarks.forEach(bookmark => {
      if (bookmark._id === $event._id) {
        Object.assign(bookmark, $event);
      }});
  }

  /**
   * Initialize and reinitialize the search objects to be empty
   */
  initSearch() {
    this.bookmarkToSearch = {};
    this.searchedBookmarks = null;
    this.showSearchSpinner = false;
  }

  /**
   * Search bookmarks into the DB
   */
  searchBookmarks() {
    this.showSearchSpinner = true;
    this._bookmarkRepositoryService.get(this.bookmarkToSearch).subscribe(res => {
      this.searchedBookmarks = res;
      this.showSearchSpinner = false;
    });
  }

  /**
   * Display the update field
   * @param bookmark the bookmark to be updated
   */
  updateBookmark(bookmark) {
    bookmark.showUpdateInputs = true;
  }

  /**
   * Delete a bookmark
   * @param bookmark the bookmark to be deleted
   * @param index the index of the bookmark in the array displayed
   */
  deleteBookmark(bookmark, index) {
    console.log(bookmark);
    console.log(index);
    this._bookmarkRepositoryService.delete(bookmark._id).subscribe(_ => {
      this.searchedBookmarks.splice(index, 1);
    });
  }
}
