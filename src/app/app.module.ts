
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AlphaVantageComponent } from './alpha-vantage/alpha-vantage.component';
import { AlphaVantageFormComponent } from './alpha-vantage/alpha-vantage-form/alpha-vantage-form.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkFormComponent } from './bookmark/bookmark-form/bookmark-form.component';

import { AlphaVantageApiService } from './alpha-vantage/shared/alpha-vantage-api.service';
import { AlphaVantageRepositoryService } from './alpha-vantage/shared/alpha-vantage-repository.service';
import { BookmarkRepositoryService } from './bookmark/shared/bookmark-repository.service';
// import { BookmarkTypesService } from './bookmark/shared/bookmark-types.service';
import { GooglePieChartService } from './shared/services/google-pie-chart.service';
import { GoogleLineChartService } from './shared/services/google-line-chart.service';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from './shared/components/line-chart/line-chart.component';

const myRoots: Routes = [
  { path: '', redirectTo: '/bookmark', pathMatch: 'full' },
  { path: 'alpha-vantage', component: AlphaVantageComponent },
  { path: 'bookmark', component: BookmarkComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlphaVantageComponent,
    AlphaVantageFormComponent,
    BookmarkComponent,
    BookmarkFormComponent,
    PieChartComponent,
    LineChartComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(myRoots),
    ReactiveFormsModule
  ],
  providers: [
    AlphaVantageApiService,
    AlphaVantageRepositoryService,
    BookmarkRepositoryService,
    GooglePieChartService,
    GoogleLineChartService
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    PieChartComponent,
    LineChartComponent
  ]
})
export class AppModule { }
