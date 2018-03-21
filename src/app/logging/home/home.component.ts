import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];

    constructor(private _userService: UserService,
                private _authService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this._authService.getLoggedUser();
        this.loadAllUsers();
    }

    /**
     * Delete a user
     * @param _id user id
     */
    deleteUser(_id: string) {
        this._userService.delete(_id).subscribe(() => { this.loadAllUsers(); });
    }

    /**
     * Load all users
     */
    private loadAllUsers() {
        this._userService.getAll().subscribe(users => { this.users = users; });
    }

}
