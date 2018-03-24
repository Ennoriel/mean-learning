import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
                private _authService: AuthenticationService) { }

    /**
     * Check whether the user is authorized to go to a specific location. If not, redirect to login page
     * @param route Route
     * @param state State
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isLogged()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
