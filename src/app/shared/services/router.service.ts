import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {

    routes: string[];
    DEFAULT_ROUTE = 'bookmark';

    constructor(
        private _router: Router
    ) { }

    /**
     * Check whether the route specified in parameter exist
     * @param selectedRoute route
     */
    existsSelectedRoute(selectedRoute: string): boolean {

        return this._router.config.map(
            route => route.path
        ).filter(
            path => path === selectedRoute.replace('/', '')
        ).length > 0;
    }

    /**
     * Get the default route
     */
    getDefaultRoute(): string {
        return this.DEFAULT_ROUTE;
    }
}
