import {Headers} from "@angular/http";
import {HttpService} from "./http.service";

export class MockHttpService extends HttpService{
    post(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        onSuccess(data);
    }

    get(url:string, onSuccess, onFailure?, headers?:Headers) {
        onSuccess();
    }

    put(url:string, data:any, onSuccess, onFailure?, headers?:Headers) {
        onSuccess(data);
    }

    delete(url:string, onSuccess, onFailure?, headers?:Headers) {
        onSuccess();
    }
}
