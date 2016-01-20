import {Injectable} from "angular2/core";
import {Comment} from "../models/comment";
import {HttpService} from "./http.service";

@Injectable()
export class CommentService {
    constructor(private _httpService:HttpService) {
    }

    create(comment, onSuccess, onFailure?) {
        this._httpService.post("/comment", comment, onSuccess, onFailure);
    }

    save(comment:Comment, onSuccess, onFailure?) {
        this._httpService.put("/comment/" + comment._id, {newComment: comment.text}, onSuccess, onFailure);
    }

    remove(id:string, onSuccess, onFailure?) {
        this._httpService.delete("/comment/" + id, onSuccess, onFailure);
    }
}