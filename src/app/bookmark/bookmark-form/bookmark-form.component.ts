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
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
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

  get formResources(): FormArray {
    return this.secondFormGroup.get('resources') as FormArray;
  }

  ngOnInit() {
    this.initModel();
    this.initForm();

    this.title = this.isFormCreate ? 'Save a new bookmark' : 'Update the bookmark';
  }

  initModel(): void {
    if (!this.model) {
      this.model = new PersistedBookmark();
    }

    this.showSaveSpinner = false;
    this.isFormCreate = !this.model._id;
  }

  initForm(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
  }

  initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.model.name, Validators.required]
    });
  }

  initSecondFormGroup(): void {
    this.secondFormGroup = new FormGroup({
      'resources' : new FormArray([])
    });

    this.model.resources.forEach(resource => this.initSecondFormResource(resource));
  }

  initSecondFormResource(resource: PersistedResource): void {
    this.formResources.push(new FormGroup({
      'name': new FormControl(resource.name, [Validators.required]),
      'link': new FormControl(resource.link, [Validators.required])
    }));
  }

  reinitSave(): void {
    this.model = new PersistedBookmark();
    this.initFirstFormGroup();
    this.initSecondFormGroup();
  }

  addResource() {
    if (this.secondFormGroup.invalid) { return; }

    this.formResources.push(new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'link': new FormControl('', [Validators.required])
    }));
    this.model.resources.push(new PersistedResource());
  }

  removeResource(index): void {
    this.formResources.removeAt(index);
    this.model.resources.splice(index, 1);
  }

  saveBookmark(): void {
    if (!this.secondFormGroup.valid) {
      return;
    }
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
