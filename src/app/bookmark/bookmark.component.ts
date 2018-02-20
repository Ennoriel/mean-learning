import { Component, OnInit } from '@angular/core';
import { BookmarkRepositoryService } from './shared/bookmark-repository.service';

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
    this.reinitSearch();
  }

  displayBookmarkSaved($event) {
    if (this.savedBookmarks) {
      this.savedBookmarks.push($event);
    } else {
      this.savedBookmarks = [$event];
    }
  }

  reinitSearch() {
    this.bookmarkToSearch = {};
    this.searchedBookmarks = null;
    this.showSearchSpinner = false;
  }

  searchBookmarks() {
    this.showSearchSpinner = true;
    this._bookmarkRepositoryService.get(this.bookmarkToSearch).subscribe(res => {
      this.searchedBookmarks = res;
      this.showSearchSpinner = false;
    });
  }

  updateBookmark(bookmark) {
    bookmark.showUpdateInputs = true;
  }

  deleteBookmark(bookmark, index) {
    console.log(bookmark);
    console.log(index);
    this._bookmarkRepositoryService.delete(bookmark._id).subscribe(_ => {
      this.searchedBookmarks.splice(index, 1);
    });
  }
}
