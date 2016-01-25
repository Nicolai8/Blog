import {Component, OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {Article} from "../models/article";
import {User} from "../models/user";
import {ArticleService} from "../services/article.service";
import {AuthService} from "../services/auth.service";
import {ArticleComponent} from "./article.component";

@Component({
    selector: "search-articles",
    templateUrl: "templates/search.component.html",
    providers: [ArticleService],
    directives: [ArticleComponent]
})


export class SearchComponent implements OnInit {
    public articles:Article[] = [];
    public searchString: string;

    constructor(private _articleService:ArticleService, private _routeParams:RouteParams) {
    }

    ngOnInit() {
        this.searchString = this._routeParams.get("searchString");
        if (this.searchString) {
            this._articleService.get(this.searchString, articles => this.articles = articles);
        }
    }
}