import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { AlertService } from '../../shared/services/alert.service';
import { RouterService } from '../../shared/services/router.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    formGroup: FormGroup;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _alertService: AlertService,
        private _routerService: RouterService,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this._initLogOut();
        this._initFormGroup();
        this._initReturnUrl();
    }

    /**
     * Reset login status
     */
    _initLogOut() {
        this._authenticationService.logout();
    }

    _initFormGroup() {
        this.formGroup = this._formBuilder.group({
            username: [this.model.username, Validators.required],
            password: [this.model.password, Validators.required]
        });
    }

    /**
     * Set the return Url to be routed after login
     */
    _initReturnUrl() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
        this.returnUrl = this._routerService.existsSelectedRoute(this.returnUrl)
                ? this.returnUrl
                : this._routerService.getDefaultRoute();
    }

    /**
     * Login a user
     */
    login() {
        this.loading = true;
        this._authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this._router.navigate([this.returnUrl]);
                },
                error => {
                    this._alertService.error(error);
                    this.loading = false;
                });
    }

    /**
     * Go to registration page
     */
    goToRegister() {

    }

}
