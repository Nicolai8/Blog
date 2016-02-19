import {Component, Input, Output, EventEmitter, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AuthService} from "../../common/services/auth.service";
import {User} from "../../common/models/user";
import {DateStringPipe} from "../../common/pipes/date-string.pipe";
import {CommentService} from "../../common/services/comment.service";

@Component({
    selector: ".comment",
    moduleId: module.id,
    templateUrl: "comment.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: [DateStringPipe]
})

export class CommentComponent implements OnInit {
    public user:User;
    public isAuthorized:boolean;
    public editComment;
    public editMode:boolean = false;
    @Input() comment:Comment;
    @Output() removed = new EventEmitter<Comment>();

    constructor(private _commentService:CommentService, private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.user.subscribe(user=> this.user = user);
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    }

    edit() {
        this.editComment = Object.assign({}, this.comment);
        this.editMode = true;
    }

    cancel() {
        this.editMode = false;
    }

    save() {
        this._commentService.save(this.editComment,
            ()=> {
                this.comment = this.editComment;
                this.editMode = false;
            });
    }

    remove(comment) {
        this._commentService.remove(comment._id,
            ()=> {
                this.removed.emit(comment);
            });
    }
}
