import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {User} from "../models/user";
import "rxjs/add/operator/map";
import {Router} from "angular2/router";

@Injectable()
export class HttpService {
    private headers:Headers = new Headers({
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest"
    });

    constructor(private _http:Http, private _router:Router) {
    }

    post(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        this._http.post(url, JSON.stringify(data), {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => this._errorHandler(err, onFailure)
            );
    }

    get(url:string, onSuccess, onFailure?, headers?:Headers) {
        this._http.get(url, {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => this._errorHandler(err, onFailure)
            );
    }

    put(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        this._http.put(url, JSON.stringify(data), {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => this._errorHandler(err, onFailure)
            );
    }

    delete(url:string, onSuccess, onFailure?, headers?:Headers) {
        this._http.delete(url, {
                headers: headers || this.headers
            })
            .subscribe(
                onSuccess,
                err => this._errorHandler(err, onFailure)
            );
    }

    private _errorHandler(err, onFailure?) {
        this._router.navigate(["Error", err.json()]);
        onFailure && onFailure(err);
    }
}
