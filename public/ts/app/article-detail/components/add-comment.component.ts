import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {AuthService} from "../../common/services/auth.service";
import {User} from "../../common/models/user";
import {CommentService} from "../../common/services/comment.service";
import {SubmitOnDirective} from "../../common/directives/submit-on.directive";
import {Control} from "@angular/common";

@Component({
    selector: "add-comment",
    moduleId: module.id,
    templateUrl: "add-comment.component.html",
    directives: [SubmitOnDirective]
})

export class AddCommentComponent implements OnInit {
    public isAuthorized:boolean;
    @Input() articleId:string;
    @Output() onAdded = new EventEmitter<Comment>();

    constructor(private _commentService:CommentService, private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    }

    add(newComment) {
        this._commentService.create(
            {
                newComment: newComment.value,
                articleId: this.articleId
            },
            (comment)=> {
                this.onAdded.emit(comment);
                newComment.control.updateValue("");
            });
    }
}
