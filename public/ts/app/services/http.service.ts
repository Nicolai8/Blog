import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {User} from "../models/user";
import "rxjs/add/operator/map";

@Injectable()
export class HttpService {
    private headers:Headers = new Headers({
        "Content-Type": "application/json",
        "x-requested-with": "XMLHttpRequest"
    });

    constructor(private _http:Http) {
    }

    post(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        this._http.post(url, JSON.stringify(data), {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => HttpService.errorHandler(err, onFailure)
            );
    }

    get(url:string, onSuccess, onFailure?, headers?:Headers) {
        this._http.get(url, {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => HttpService.errorHandler(err, onFailure)
            );
    }

    put(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        this._http.put(url, JSON.stringify(data), {
                headers: headers || this.headers
            })
            .map(res => res.json())
            .subscribe(
                onSuccess,
                err => HttpService.errorHandler(err, onFailure)
            );
    }

    delete(url:string, onSuccess, onFailure?, headers?:Headers) {
        this._http.delete(url, {
                headers: headers || this.headers
            })
            .subscribe(
                onSuccess,
                err => HttpService.errorHandler(err, onFailure)
            );
    }

    private static errorHandler(err, onFailure?) {
        console.log(err);
        onFailure && onFailure(err);
    }
}
