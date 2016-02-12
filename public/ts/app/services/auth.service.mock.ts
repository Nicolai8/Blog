import {User} from "../models/user";
import {BehaviorSubject} from "rxjs/Rx";

export class MockAuthService {
    private _user:BehaviorSubject<User> = new BehaviorSubject(undefined);
    private _isAuthorized:BehaviorSubject<boolean> = new BehaviorSubject(false);

    login(credentials:User, onSuccess?, onFailure?) {
        this._user.next(credentials);
        this._isAuthorized.next(true);
        onSuccess && onSuccess(credentials);
    }

    logout(onSuccess?, onFailure?) {
        this._user.next(new User(""));
        this._isAuthorized.next(false);
        onSuccess && onSuccess();
    }

    get user() {
        return this._user;
    }

    get isAuthorized() {
        return this._isAuthorized;
    }
}
