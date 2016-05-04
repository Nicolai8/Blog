import {Component, OnInit} from "@angular/core";
import {Article} from "../common/models/article";
import {ArticleComponent} from "./components/article.component";
import {RouteParams} from "@angular/router-deprecated";
import {HomeComponent} from "./home.component";
import {LoadMoreComponent} from "./components/load-more.component";
import {ArticleService} from "../common/services/article.service";

@Component({
    selector: "user-articles",
    moduleId: module.id,
    templateUrl: "user-articles.component.html",
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
