import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersistedBookmark, BookmarkSO } from '../../../bookmark/shared/bookmark-types.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookmarkRepositoryService } from '../../../bookmark/shared/bookmark-repository.service';
import { ResourceRepository } from '../../shared/resource.repository';
import { Resource, PersistedResource } from '../../shared/resource.types';
import { CopyService } from '../../../../shared/services/utils/copy.service';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {

    @Input('model') model: Resource;
    modelCopy: Resource;

    @Output() afterResourceSaved = new EventEmitter<Resource>();

    isFormCreate: boolean;

    bookmarks: PersistedBookmark[];
    formGroup: FormGroup;

    title: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _resourceRepository: ResourceRepository,
        private _bookmarkRepository: BookmarkRepositoryService,
        private _copyService: CopyService
    ) { }

    ngOnInit() {

        this._initModel();
        this._initFormGroup();
        this._initFormValues();

        this.title = this.isFormCreate ? 'Save a new resource' : 'Update the resource';

    }

    private _initModel() {
        console.log('initialisation du modèle');
        this.isFormCreate = !this.model;

        if (this.isFormCreate) {
            console.log('le modèle est vide, page de création, il est initialisé à vide');
            // this.model = new Resource();
            this.modelCopy = new Resource();
            // console.log(this.model);
        } else {
            console.log('le modèle n\'est pas vide, page de création, un objet est copié');
            this.modelCopy = this._copyService.deepCopy(this.model);
        }
    }

    private _initFormGroup() {
        this.formGroup = this._formBuilder.group({
            name: [this.modelCopy.resource.name, Validators.required],
            link: [this.modelCopy.resource.link, Validators.required],
            bookmark: [this.modelCopy._id, Validators.required]
        });
    }

    private _initFormValues() {

        this._bookmarkRepository.get(new BookmarkSO())
                                .subscribe(bookmarks => {

            this.bookmarks = bookmarks;
        });
    }

    saveResource() {
        console.log('Méthode d\'enregisrement');
        if (this.isFormCreate) {
            console.log('En Création');
            this._resourceRepository.add(this.modelCopy._id, this.modelCopy.resource)
                                    .subscribe(createdResource => {
                this.afterResourceSaved.emit(new Resource(this.modelCopy._id, createdResource));
            });
        } else {
            console.log('En mise à jour');
            console.log(this.model);
            if (this.model._id === this.modelCopy._id) {
                console.log('En mise à jour des données');
                this._resourceRepository.updateInfos(this.model._id, this.model.resource.name, this.modelCopy.resource)
                                        .subscribe(updatedResource => {
                    this.afterResourceSaved.emit(new Resource(this.model._id, updatedResource));
                });
            } else {
                console.log('En mise à jour du bookmark');
                this._resourceRepository.updateBookmark(this.model, this.modelCopy)
                                        .subscribe(updatedResource => {
                                            console.log(updatedResource);
                    this.afterResourceSaved.emit(new Resource(this.modelCopy._id, updatedResource[1]));
                });
            }
        }
    }
}
