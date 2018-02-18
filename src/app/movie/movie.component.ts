import { Component, OnInit } from '@angular/core';
import { MovieRepositoryService } from './shared/movie-repository.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieToSearch;

  savedMovies;
  searchedMovies;

  showSaveSpinner;
  showSearchSpinner;

  constructor(
    private _movieRepositoryService: MovieRepositoryService
  ) { }

  ngOnInit() {
    this.reinitSearch();
  }

  displayMovieSaved($event) {
    if (this.savedMovies) {
      this.savedMovies.push($event);
    } else {
      this.savedMovies = [$event];
    }
  }

  reinitSearch() {
    this.movieToSearch = {};
    this.searchedMovies = null;
    this.showSearchSpinner = false;
  }

  searchMovies() {
    this.showSearchSpinner = true;
    this._movieRepositoryService.get(this.movieToSearch).subscribe(res => {
      this.searchedMovies = res;
      this.showSearchSpinner = false;
    });
  }

  updateMovie(movie) {
    movie.showUpdateInputs = true;
  }

  deleteMovie(movie, index) {
    console.log(movie);
    console.log(index);
    this._movieRepositoryService.delete(movie._id).subscribe(_ => {
      this.searchedMovies.splice(index, 1);
    });
  }
}
