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
    providers: [AuthService]
})

export class LoginComponent implements OnInit {
    public user:User;
    public isLoggedIn:boolean = false;

    constructor(private _authService:AuthService) {
    }

    ngOnInit() {
        this.user = this._authService.getUser();
        this.isLoggedIn = typeof this.user != "undefined";
        this.user = this.user || new User("");
    }

    login(e) {
        var self = this;
        this._authService.login(
            this.user,
            user => {
                self.user = user;
                self.isLoggedIn = true;
                jQuery(e.target).closest("li.dropdown").removeClass("dropdown open");
            }
        );
    }

    logout(e) {
        var self = this;
        this._authService.logout(()=> {
            self.user = new User("");
            self.isLoggedIn = false;
            jQuery(e.target).closest("li").addClass("dropdown");
        });
    }
}