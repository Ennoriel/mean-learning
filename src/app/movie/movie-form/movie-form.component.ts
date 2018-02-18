import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit} from '@angular/core';
import {  } from 'protractor';
import { MovieRepositoryService } from '../shared/movie-repository.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Input('model') model: any;
  @Output() afterMovieSaved = new EventEmitter();

  showSaveSpinner;
  isFormCreate: boolean;
  isFormUpdate: boolean;

  constructor(
    private _movieRepositoryService: MovieRepositoryService
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

  saveMovie() {
    this.showSaveSpinner = true;

    if (this.model._id) {
      this._movieRepositoryService.put(this.model).subscribe(savedMovie => {
        this.afterMovieSaved.emit(savedMovie);
        this.showSaveSpinner = false;
      });
    } else {
      this._movieRepositoryService.post(this.model).subscribe(savedMovie => {
        this.afterMovieSaved.emit(savedMovie);
        this.showSaveSpinner = false;
      });
    }
  }
}
