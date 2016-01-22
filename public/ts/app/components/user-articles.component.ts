import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {ArticleComponent} from "./article.component";
import {User} from "../models/user";
import {RouteParams} from "angular2/router";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "user-articles",
    templateUrl: "templates/user-articles.component.html",
    providers: [ArticleService],
    directives: [ArticleComponent]
})

export class UserArticlesComponent implements OnInit {
    public articles:Article[] = [];
    public userId:string;

    constructor(private _articleService:ArticleService, private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.userId = this._routeParams.get("id");
        if (this.userId) {
            this._articleService.getByUserId(this.userId, articles => this.articles = articles);
        }
    }
}
