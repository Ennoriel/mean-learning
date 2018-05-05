import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import {  } from 'protractor';
import { BookmarkRepositoryService } from '../shared/bookmark-repository.service';
import { Observable } from 'rxjs/Observable';
import { PersistedBookmark } from '../shared/bookmark-types.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PersistedResource } from '../../resource/shared/resource.types';
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

  /**
   * getter of the resource form array used in the second form group
   */
  get formResources(): FormArray {
    return this.secondFormGroup.get('resources') as FormArray;
  }

  ngOnInit() {
    this.initModel();
    this.initForm();

    this.title = this.isFormCreate ? 'Save a new bookmark' : 'Update the bookmark';
  }

  /**
   * Init model according to the editing mode (cration / update)
   */
  initModel(): void {
    if (!this.model) {
      this.model = new PersistedBookmark();
    }

    this.showSaveSpinner = false;
    this.isFormCreate = !this.model._id;
  }

  /**
   * Init form
   */
  initForm(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
  }

  /**
   * Init the first form group, used for bookmark details
   */
  initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.model.name, Validators.required]
    });
  }

  /**
   * Init the second form group, used for bookmark resources
   */
  initSecondFormGroup(): void {
    this.secondFormGroup = new FormGroup({
      'resources' : new FormArray([])
    });

    this.model.resources.forEach(resource => this.initSecondFormResource(resource));
  }

  /**
   * Init the form array, used in the second form group for bookmark resources
   */
  initSecondFormResource(resource: PersistedResource): void {
    this.formResources.push(new FormGroup({
      'name': new FormControl(resource.name, [Validators.required]),
      'link': new FormControl(resource.link, [Validators.required])
    }));
  }

  /**
   * Triggered by a user action
   * Init model for another search
   */
  reinitModel(): void {
    this.model = new PersistedBookmark();
    this.initFirstFormGroup();
    this.initSecondFormGroup();
  }

  /**
   * Triggered by a user action
   * Init another resource in the form
   */
  addResource() {
    if (this.secondFormGroup.invalid) { return; }

    this.formResources.push(new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'link': new FormControl('', [Validators.required])
    }));
    this.model.resources.push(new PersistedResource());
  }

  /**
   * Triggered by a user action
   * Remove a resource
   * @param index index of the resource to remove
   */
  removeResource(index): void {
    this.formResources.removeAt(index);
    this.model.resources.splice(index, 1);
  }

  /**
   * Triggered by a user action
   * Save or update the bookmark
   */
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
        this.reinitModel();
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
