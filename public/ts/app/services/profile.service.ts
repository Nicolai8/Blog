import {Injectable} from "angular2/core";
import {Profile} from "../models/profile";
import {HttpService} from "./http.service";

@Injectable()

export class ProfileService {
    constructor(private _httpService:HttpService) {
    }

    get(id:string, onSuccess?, onFailure?) {
        this._httpService.get("/profile/" + id, onSuccess, onFailure);
    }

    save(profile:Profile, onSuccess?, onFailure?) {
        this._httpService.put("/profile", profile, onSuccess, onFailure);
    }

    remove(onSuccess?, onFailure?) {
        this._httpService.delete("/profile", onSuccess, onFailure);
    }
}
