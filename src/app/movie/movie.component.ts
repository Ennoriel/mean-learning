import { Component, OnInit } from '@angular/core';
import { MovieRepositoryService } from './shared/movie-repository.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieToSave;
  movieToSearch;

  savedMovie;
  searchedMovies;

  showSaveSpinner;
  showSearchSpinner;

  constructor(
    private _movieRepositoryService: MovieRepositoryService
  ) { }

  ngOnInit() {
    this.movieToSave = {};
    this.movieToSearch = {};

    this.showSaveSpinner = false;
    this.showSearchSpinner = false;
  }

  saveMovie() {
    this.showSaveSpinner = true;
    this._movieRepositoryService.post(this.movieToSave).subscribe(res => {
      this.savedMovie = res;
      this.showSaveSpinner = false;
    });
  }

  searchMovies() {
    this.showSearchSpinner = true;
    this._movieRepositoryService.get(this.movieToSearch).subscribe(res => {
      this.searchedMovies = res;
      this.showSearchSpinner = false;
    });
  }
}
