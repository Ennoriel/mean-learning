import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import {  } from 'protractor';
import { BookmarkRepositoryService } from '../shared/bookmark-repository.service';
import { Observable } from 'rxjs/Observable';
import { PersistedBookmark, PersistedResource } from '../shared/bookmark-types.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {

  @Input('model') model: PersistedBookmark;
  @Output() afterBookmarkSaved = new EventEmitter<PersistedBookmark>();

  showSaveSpinner: boolean;
  isFormCreate: boolean;
  title: string;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _bookmarkRepositoryService: BookmarkRepositoryService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      resourceName_0: ['', Validators.required],
      resourceLink_0: ['', Validators.required]
    });

    this.initSave();
    this.isFormCreate = !this.model._id;
    this.title = this.isFormCreate ? 'Save a new bookmark' : 'Update the bookmark';
  }

  initSave(): void {
    if (!this.model) {
      this.model = new PersistedBookmark();
    }
    this.showSaveSpinner = false;
  }

  reinitSave(): void {
    this.model = new PersistedBookmark();
  }

  removeResource(index): void {
    this.model.resources.splice(index, 1);
  }

  addResource(): void {
    this.model.resources.push(new PersistedResource());
  }

  saveBookmark(): void {
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
