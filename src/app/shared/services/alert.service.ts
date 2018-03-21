import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class AlertService {

    private subject = new Subject<any>();

    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    /**
     * Resolve subject with a success response
     * @param message message
     * @param keepAfterNavigationChange boolean to keep the message
     */
    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    /**
     * Resolve subject with an error response
     * @param message message
     * @param keepAfterNavigationChange boolean to keep the message
     */
    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    /**
     * Get asynchronously the message
     */
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}
