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
    templateUrl: "templates/login.component.html"
})

export class LoginComponent implements OnInit {
    public isAuthorized:boolean;

    constructor(private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    }

    login(e, user) {
        this._authService.login(
            user,
            () => {
                jQuery(e.target).closest("li.dropdown").removeClass("dropdown open");
            }
        );
    }

    logout(e) {
        this._authService.logout(()=> {
            jQuery(e.target).closest("li").addClass("dropdown");
        });
    }
}