
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AlertComponent } from './logging/alert/alert.component';
import { HomeComponent } from './logging/home/home.component';
import { routing } from './app.routing';
import { LoginComponent } from './logging/login/login.component';
import { RegisterComponent } from './logging/register/register.component';
import { AuthGuard } from './shared/services/guard/auth.guard';
import { AlertService } from './shared/services/alert.service';
import { ErrorInterceptorProvider } from './shared/services/helpers/error.interceptor';
import { JwtInterceptorProvider } from './shared/services/helpers/jwt.interceptor';
import { UserService } from './shared/services/user.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { RouterService } from './shared/services/router.service';
import { AccueilComponent } from './accueil/accueil.component';

// const myRoots: Routes = [
//     { path: '', redirectTo: '/bookmark', pathMatch: 'full' },
//     { path: 'alpha-vantage', component: AlphaVantageComponent },
//     { path: 'bookmark', component: BookmarkComponent }
// ];

@NgModule({
    declarations: [
        AppComponent,
        AlphaVantageComponent,
        AlphaVantageFormComponent,
        BookmarkComponent,
        BookmarkFormComponent,
        PieChartComponent,
        LineChartComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
    AccueilComponent
],
    imports: [
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        // RouterModule.forRoot(myRoots),
        ReactiveFormsModule,
        routing
    ],
    providers: [
        AlphaVantageApiService,
        AlphaVantageRepositoryService,
        BookmarkRepositoryService,
        GooglePieChartService,
        GoogleLineChartService,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider,
        RouterService
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
