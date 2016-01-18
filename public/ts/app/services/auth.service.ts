import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {User} from "../models/user";

@Injectable()

export class AuthService {
    private _user:User;

    constructor(private _http:Http) {
    }

    login(credentials:User, onSuccess?, onFailure?) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post("/login", JSON.stringify(credentials),{
                headers: headers
            })
            .map(res => res.json())
            .subscribe(user => {
                    this._user = user;
                    onSuccess(user);
                },
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                });
    }

    logout(onSuccess, onFailure?) {
        this._http.post("/logout", "")
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }

    getUser() {
        if (!this._user) {
            this._user = window["user"];
        }
        return this._user;
    }
}
