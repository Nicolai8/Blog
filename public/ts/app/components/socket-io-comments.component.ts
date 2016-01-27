/// <reference path="../../definitions/socket.io-client.d.ts"/>
import {Component, OnInit, Output, EventEmitter} from "angular2/core";
import {SocketIOService} from "../services/socket-io.service";

@Component({
    selector: "socket-io-comments",
    templateUrl: "templates/socket-io-comments.component.html"
})

export class SocketIOCommentsComponent implements OnInit {
    @Output() onUpdate:EventEmitter<Function> = new EventEmitter();
    public deleted:number = 0;
    public updated:number = 0;
    public added:number = 0;

    constructor(private _socketIOService:SocketIOService) {
    }

    ngOnInit() {
        this._socketIOService.commentAdded(()=>this.added++);
        this._socketIOService.commentDeleted(()=>this.deleted++);
        this._socketIOService.commentUpdated(()=>this.updated++);
    }

    updateComments() {
        var self = this;
        this.onUpdate.emit(function () {
            self.deleted = 0;
            self.updated = 0;
            self.added = 0;
        });
    }
}