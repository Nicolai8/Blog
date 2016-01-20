import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {RouteParams} from "angular2/router";
import {CommentComponent} from "./comment.component";
import {Comment} from "../models/comment";
import {CommentService} from "../services/comment.service";
import {AuthService} from "../services/auth.service";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {User} from "../models/user";
import {ChangeDetectionStrategy} from "angular2/core";

@Component({
    selector: "article-detail",
    templateUrl: "templates/article-detail.component.html",
    providers: [ArticleService, CommentService],
    directives: [CommentComponent],
    pipes: [DateStringPipe],
    inputs: ["article"]
})

export class ArticleDetailComponent implements OnInit {
    public article:Article;
    public isAuthorized:boolean;

    constructor(private _commentService:CommentService,
                private _articleService:ArticleService,
                private _routeParams:RouteParams,
                private _authService:AuthService) {
    }

    ngOnInit() {
        let articleId = this._routeParams.get("id");
        this._articleService.getById(articleId,
            article => this.article = article
        );
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
    }

    addComment(newComment) {
        this._commentService.create(
            {
                newComment: newComment,
                articleId: this.article._id
            },
            (comment)=> {
                this.article.comments.push(comment);
            });
    }

    onCommentRemoved(comment) {
        this.article.comments = this.article.comments.filter((item)=> {
            return item._id != comment._id;
        });
    }
}
