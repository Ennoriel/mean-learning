import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    model: any = {};
    loading = false;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _alertService: AlertService) { }

    /**
     * Register a user
     */
    register() {
        this.loading = true;
        this._userService.create(this.model)
            .subscribe(
                data => {
                    this._alertService.success('Registration successful', true);
                    this._router.navigate(['/login']);
                },
                error => {
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

}
