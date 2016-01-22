import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ArticleService} from "../services/article.service";
import {CommentService} from "../services/comment.service";
import {AuthService} from "../services/auth.service";
import {Article} from "../models/article";
import {Comment} from "../models/comment";
import {User} from "../models/user";
import {CommentComponent} from "./comment.component";
import {DateStringPipe} from "../pipes/date-string.pipe";

@Component({
    selector: "article-detail",
    templateUrl: "templates/article-detail.component.html",
    providers: [ArticleService, CommentService],
    directives: [CommentComponent, ROUTER_DIRECTIVES],
    pipes: [DateStringPipe],
    inputs: ["article"]
})

export class ArticleDetailComponent implements OnInit {
    private _user:User;
    public article:Article;
    public editArticle:Article;
    public isAuthorized:boolean;
    public canEdit:boolean = false;

    constructor(private _commentService:CommentService,
                private _articleService:ArticleService,
                private _authService:AuthService,
                private _router:Router,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        let articleId = this._routeParams.get("id");
        this._articleService.getById(articleId,
            article => {
                this.article = article;
                this.canEdit = this._user && this._user["_id"] == article._owner._id;
            }
        );
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
        this._authService.user.subscribe(user => {
            this._user = user;
            this.canEdit = this.article && user["_id"] == this.article._owner._id;
        });
    }

    edit() {
        this.editArticle = Object.assign({}, this.article);
    }

    save(event) {
        this._articleService.save(this.editArticle,
            (article)=> {
                this.article = this.editArticle;
                jQuery(event.target).closest(".modal").modal("hide");
            });
    }

    remove() {
        if (confirm("Are you sure?")) {
            this._articleService.remove(this.article._id,
                ()=> this._router.navigate(["Home"]));
        }
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
