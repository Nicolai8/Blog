/// <reference path="../../definitions/jquery.d.ts" />
declare var y;
import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {AppComponent} from "./app.component";

@Component({
    selector: ".login-form",
    templateUrl: "templates/login.component.html",
    directives: [ROUTER_DIRECTIVES]
})

export class LoginComponent implements OnInit {
    public isAuthorized:boolean;
    public user: User;

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