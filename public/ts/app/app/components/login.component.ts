import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {AuthService} from "../../common/services/auth.service";
import {User} from "../../common/models/user";
import {AppComponent} from "../app.component";

@Component({
    selector: ".login-form",
    moduleId: module.id,
    templateUrl: "login.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
    public isAuthorized:boolean;
    public user: User;
    public loginUser: User = new User("");

    constructor(private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
        this._authService.user.subscribe(user => this.user = user);
    }

    login(e, user) {
        this._authService.login(
            user,
            () => {
                jQuery(e.target).closest("li.dropdown").removeClass("open");
            }
        );
    }

    logout() {
        this._authService.logout();
    }
}