import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {Credentials} from "../models/credentials";

@Injectable()

export class AuthService {
    constructor(private _http:Http) {
    }

    login(credentials:Credentials, onSuccess, onFailure) {
        this._http.post("/login", JSON.stringify(credentials))
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                });
    }

    logout(onSuccess, onFailure) {
        this._http.post("/logout", "")
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }
}
