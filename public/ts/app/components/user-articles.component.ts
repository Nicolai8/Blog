import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleComponent} from "./article.component";
import {RouteParams} from "angular2/router";
import {HomeComponent} from "./home.component";
import {LoadMoreComponent} from "./load-more.component";
import {ArticleService} from "../services/article.service";

@Component({
    selector: "user-articles",
    templateUrl: "templates/user-articles.component.html",
    directives: [ArticleComponent, LoadMoreComponent]
})

export class UserArticlesComponent extends HomeComponent implements OnInit {
    public userId:string;

    constructor(protected _articleService:ArticleService, private _routeParams:RouteParams) {
        super(_articleService);
        this._getArticles = this._articleService.getByUserId.bind(this._articleService);
    }

    ngOnInit() {
        this.searchString = this.userId = this._routeParams.get("id");
    }
}
