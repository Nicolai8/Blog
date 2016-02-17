import {Component} from "angular2/core";
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {PromiseWrapper} from "angular2/src/facade/promise";
import {ArticleService} from "../services/article.service";
import {CommentService} from "../services/comment.service";
import {AuthService} from "../services/auth.service";
import {SocketIOService} from "../services/socket-io.service";
import {Article} from "../models/article";
import {Comment} from "../models/comment";
import {User} from "../models/user";
import {CommentComponent} from "./comment.component";
import {SocketIOCommentsComponent} from "./socket-io-comments.component";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {RatingDirective} from "../directives/rating.directive";
import {AddCommentComponent} from "./add-comment.component";
import {EditArticleComponent} from "./edit-article.component";
import {PageComponent} from "./page.component";

@Component({
    selector: "article-detail",
    templateUrl: "templates/article-detail.component.html",
    providers: [ArticleService, CommentService, SocketIOService],
    directives: [CommentComponent, ROUTER_DIRECTIVES, RatingDirective, SocketIOCommentsComponent, AddCommentComponent, EditArticleComponent],
    pipes: [DateStringPipe],
    inputs: ["article"]
})

export class ArticleDetailComponent extends PageComponent {
    private _user:User;
    public article:Article;
    public isAuthorized:boolean;
    public canEdit:boolean = false;

    constructor(private _commentService:CommentService,
                private _articleService:ArticleService,
                private _authService:AuthService,
                private _router:Router,
                private _routeParams:RouteParams) {
        super();
    }

    beforeInit() {
        let setUserCompleter = PromiseWrapper.completer();
        let articleId = this._routeParams.get("id");
        this._articleService.getById(articleId,
            article => {
                this.article = article;
                this.canEdit = this._user && this._user["_id"] == article._owner._id;
                this._completer.resolve();
            }
        );
        this._authService.isAuthorized.subscribe(isAuthorized => this.isAuthorized = isAuthorized);
        this._authService.user.subscribe(user => {
            this._user = user;
            this.canEdit = this.article && user && user["_id"] == this.article._owner._id;
            setUserCompleter.resolve();
        });

        return Promise.all([
            setUserCompleter.promise,
            this._completer.promise
        ]);
    }

    remove() {
        if (confirm("Are you sure?")) {
            this._articleService.remove(this.article._id,
                ()=> this._router.navigate(["Home"]));
        }
    }

    onCommentAdded(comment) {
        this.article.comments.push(comment);
    }

    onCommentRemoved(comment) {
        this.article.comments = this.article.comments.filter((item)=> {
            return item._id != comment._id;
        });
    }

    onArticleUpdated(article) {
        this.article = article;
    }

    onRatingChanged(newArticleRating) {
        this.article.rating = newArticleRating;
    }

    getComments(callback) {
        this._commentService.getByArticleId(this.article._id,
            (comments)=> {
                this.article.comments = comments;
                callback();
            });
    }
}