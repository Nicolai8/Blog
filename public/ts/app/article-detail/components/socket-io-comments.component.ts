import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {SocketIOService} from "../../common/services/socket-io.service";

@Component({
    selector: "socket-io-comments",
    moduleId: module.id,
    templateUrl: "socket-io-comments.component.html"
})

export class SocketIOCommentsComponent implements OnInit {
    @Output() onUpdate = new EventEmitter<Function>();
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