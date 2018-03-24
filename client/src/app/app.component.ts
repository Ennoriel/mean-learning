import { Component } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    isLogged: boolean;

    constructor (
        private _authService: AuthenticationService
    ) {}

    ngOnInit () {
        this.isLogged = this._authService.isLogged();
    }
}
