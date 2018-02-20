import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import {  } from 'protractor';
import { BookmarkRepositoryService } from '../shared/bookmark-repository.service';

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
  isFormUpdate: boolean;

  constructor(
    private _bookmarkRepositoryService: BookmarkRepositoryService
  ) { }

  ngOnInit() {
    this.initSave();
  }

  initSave() {
    if (!this.model) {
      this.model = {};
    }
    this.showSaveSpinner = false;
  }

  reinitSave() {
    this.model = {};
  }

  saveBookmark() {
    this.showSaveSpinner = true;

    if (this.model._id) {
      this._bookmarkRepositoryService.put(this.model._id, this.model).subscribe(savedBookmark => {
        this.afterBookmarkSaved.emit(savedBookmark);
        this.showSaveSpinner = false;
      });
    } else {
      this._bookmarkRepositoryService.post(this.model).subscribe(savedBookmark => {
        this.afterBookmarkSaved.emit(savedBookmark);
        this.showSaveSpinner = false;
      });
    }
  }
}
