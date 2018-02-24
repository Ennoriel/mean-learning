import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import {  } from 'protractor';
import { BookmarkRepositoryService } from '../shared/bookmark-repository.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  @Input('model') model: any;
  @Output() afterBookmarkSaved = new EventEmitter();

  showSaveSpinner;
  isFormCreate: boolean;
  title;

  constructor(
    private _bookmarkRepositoryService: BookmarkRepositoryService
  ) { }

  ngOnInit() {
    this.initSave();
    this.isFormCreate = !this.model._id;
    this.title = this.isFormCreate ? 'Save a new bookmark' : 'Update the bookmark';
  }

  initSave() {
    this.model = this.model ? Object.assign({}, this.model) : {};
    this.showSaveSpinner = false;
  }

  reinitSave() {
    this.model = {};
  }

  saveBookmark() {
    this.showSaveSpinner = true;

    if (this.model._id) {
      this._bookmarkRepositoryService.put(this.model._id, this.model).subscribe(
        updatedBookmark => {
          this.afterBookmarkSaved.emit(updatedBookmark);
          this.showSaveSpinner = false;
        },
        error => {
          this.showSaveSpinner = false;
          alert(error);
        });
    } else {
      this._bookmarkRepositoryService.post(this.model).subscribe(savedBookmark => {
        this.reinitSave();
        this.afterBookmarkSaved.emit(savedBookmark);
        this.showSaveSpinner = false;
      },
      error => {
        this.showSaveSpinner = false;
        alert(error);
      });
    }
  }
}
