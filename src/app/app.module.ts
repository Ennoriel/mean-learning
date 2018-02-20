
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
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkFormComponent } from './bookmark/bookmark-form/bookmark-form.component';

import { AlphaVantageApiService } from './alpha-vantage/shared/alpha-vantage-api.service';
import { AlphaVantageRepositoryService } from './alpha-vantage/shared/alpha-vantage-repository.service';
import { BookmarkRepositoryService } from './bookmark/shared/bookmark-repository.service';
import { BookmarkTypesService } from './bookmark/shared/bookmark-types.service';

const myRoots: Routes = [
  { path: '', redirectTo: '/alpha-vantage', pathMatch: 'full' },
  { path: 'alpha-vantage', component: AlphaVantageComponent },
  { path: 'bookmark', component: BookmarkComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlphaVantageComponent,
    AlphaVantageFormComponent,
    BookmarkComponent,
    BookmarkFormComponent
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
    BookmarkRepositoryService,
    BookmarkTypesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
