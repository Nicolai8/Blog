import {User} from "../models/user";
import {HttpService} from "./http.service";
import {Injectable} from "angular2/core";
import {Headers} from "angular2/http";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class AuthService {
    private _user:BehaviorSubject<User>;
    private _isAuthorized:BehaviorSubject<boolean>;

    constructor(private _httpService:HttpService) {
        let user = window["user"];
        this._user = new BehaviorSubject(user);
        this._isAuthorized = new BehaviorSubject(!!user);
    }

    login(credentials:User, onSuccess?, onFailure?) {
        var self = this;
        this._httpService.post(
            "/login",
            credentials,
            user => {
                self._user.next(user);
                self._isAuthorized.next(true);
                onSuccess(user);
            },
            onFailure);
    }

    logout(onSuccess?, onFailure?) {
        var self = this;
        this._httpService.post("/logout", "",
            ()=> {
                self._user.next(new User(""));
                self._isAuthorized.next(false);
                onSuccess && onSuccess();
            }, onFailure, new Headers({
                "x-requested-with": "XMLHttpRequest"
            }));
    }

    get user() {
        return this._user;
    }

    get isAuthorized() {
        return this._isAuthorized;
    }
}
