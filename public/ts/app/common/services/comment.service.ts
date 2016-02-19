import {Injectable} from "angular2/core";
import {Comment} from "../models/comment";
import {HttpService} from "./http.service";
import {SocketIOService} from "./socket-io.service";

@Injectable()
export class CommentService {
    constructor(private _httpService:HttpService, private _socketIOService:SocketIOService) {
    }

    getByArticleId(id:string, onSuccess, onFailure?) {
        this._httpService.get("/comment/getByArticleId/" + id, onSuccess, onFailure);
    }

    create(comment, onSuccess, onFailure?) {
        comment.socketId = this._socketIOService.socket.id;
        this._httpService.post("/comment", comment, onSuccess, onFailure);
    }

    save(comment:Comment, onSuccess, onFailure?) {
        this._httpService.put("/comment/" + comment._id, {
            newComment: comment.text,
            socketId: this._socketIOService.socket.id
        }, onSuccess, onFailure);
    }

    remove(id:string, onSuccess, onFailure?) {
        this._httpService.delete("/comment/" + id + "?socketId=" + this._socketIOService.socket.id, onSuccess, onFailure);
    }
}