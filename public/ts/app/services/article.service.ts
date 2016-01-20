import {Injectable} from "angular2/core";
import {Article} from "../models/article";
import {HttpService} from "./http.service";

@Injectable()

export class ArticleService {
    constructor(private _httpService:HttpService) {
    }

    get(searchQuery:string, onSuccess?, onFailure?) {
        this._httpService.get("/article/" + searchQuery, onSuccess, onFailure);
    }

    getById(id:string, onSuccess?, onFailure?) {
        this._httpService.get("/article/getById/" + id, onSuccess, onFailure);
    }

    create(article:Article, onSuccess?, onFailure?) {
        this._httpService.post("/article", article, onSuccess, onFailure);
    }

    save(article:Article, onSuccess?, onFailure?) {
        this._httpService.put("/article/" + article._id, article, onSuccess, onFailure);
    }

    remove(id:string, onSuccess?, onFailure?) {
        this._httpService.delete("/article/" + id, onSuccess, onFailure);
    }
}
