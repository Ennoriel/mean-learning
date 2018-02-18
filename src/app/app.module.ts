
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlphaVantageComponent } from './alpha-vantage/alpha-vantage.component';
import { AlphaVantageFormComponent } from './alpha-vantage/alpha-vantage-form/alpha-vantage-form.component';
import { MovieComponent } from './movie/movie.component';
import { MovieFormComponent } from './movie/movie-form/movie-form.component';

import { AlphaVantageApiService } from './alpha-vantage/shared/alpha-vantage-api.service';
import { AlphaVantageRepositoryService } from './alpha-vantage/shared/alpha-vantage-repository.service';
import { MovieRepositoryService } from './movie/shared/movie-repository.service';
import { MovieTypesService } from './movie/shared/movie-types.service';

const myRoots: Routes = [
  { path: '', redirectTo: '/alpha-vantage', pathMatch: 'full' },
  { path: 'alpha-vantage', component: AlphaVantageComponent },
  { path: 'movie', component: MovieComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlphaVantageComponent,
    AlphaVantageFormComponent,
    MovieComponent,
    MovieFormComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(myRoots)
  ],
  providers: [
    AlphaVantageApiService,
    AlphaVantageRepositoryService,
    MovieRepositoryService,
    MovieTypesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
