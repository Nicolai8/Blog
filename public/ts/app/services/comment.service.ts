import {Http} from "angular2/http";
import {Injectable} from "angular2/core";
import {Comment} from "../models/comment";

@Injectable()

export class CommentService {
    constructor(private _http:Http) {
    }

    create(comment:Comment, onSuccess, onFailure) {
        this._http.post("/comment", JSON.stringify(comment))
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                });
    }

    save(comment:Comment, onSuccess, onFailure) {
        this._http.put("/comment/" + comment._id, JSON.stringify(comment))
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }

    remove(id:string, onSuccess, onFailure) {
        this._http.delete("/comment/" + id)
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }
}
