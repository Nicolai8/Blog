import {Component, Input, Output, EventEmitter, OnInit} from "angular2/core";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";
import {CommentService} from "../services/comment.service";
import {SubmitOnDirective} from "../directives/submit-on.directive";

@Component({
    selector: "add-comment",
    templateUrl: "templates/add-comment.component.html",
    directives: [SubmitOnDirective]
})

export class AddCommentComponent implements OnInit {
    public isAuthorized:boolean;
    public newComment:string;
    @Input() articleId:string;
    @Output() onAdded = new EventEmitter<Comment>();

    constructor(private _commentService:CommentService, private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    }

    add() {
        this._commentService.create(
            {
                newComment: this.newComment,
                articleId: this.articleId
            },
            (comment)=> {
                this.onAdded.emit(comment);
                this.newComment = "";
            });
    }
}
