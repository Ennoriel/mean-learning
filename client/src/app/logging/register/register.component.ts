import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    model: any = {};
    loading = false;
    formGroup: FormGroup;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _alertService: AlertService,
        private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this._initFormGroup();
    }

    /**
     * Init form group
     */
    _initFormGroup() {
        this.formGroup = this._formBuilder.group({
            firstName: [this.model.firstName, Validators.required],
            lastName: [this.model.lastName, Validators.required],
            username: [this.model.username, Validators.required],
            password: [this.model.password, [Validators.required, Validators.minLength(8)]]
        });
        console.log(this.formGroup.controls.password);
    }

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
