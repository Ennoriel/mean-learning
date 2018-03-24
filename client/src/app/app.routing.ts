import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './logging/home/home.component';
import { LoginComponent } from './logging/login/login.component';
import { AuthGuard } from './shared/services/guard/auth.guard';
import { RegisterComponent } from './logging/register/register.component';
import { AlphaVantageComponent } from './alpha-vantage/alpha-vantage.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { AccueilComponent } from './accueil/accueil.component';

const appRoutes: Routes = [
    { path: '', component: AccueilComponent },
    { path: 'alpha-vantage', component: AlphaVantageComponent, canActivate: [AuthGuard] },
    { path: 'bookmark', component: BookmarkComponent, canActivate: [AuthGuard] },
    { path: 'utilisateurs', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', component: BookmarkComponent, canActivate: [AuthGuard] }
];

//     { path: '', redirectTo: '/bookmark', pathMatch: 'full' },
//     { path: 'alpha-vantage', component: AlphaVantageComponent },
//     { path: 'bookmark', component: BookmarkComponent }

export const routing = RouterModule.forRoot(appRoutes);
