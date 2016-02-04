import {Component, OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {ArticleService} from "../services/article.service";
import {ArticleComponent} from "./article.component";
import {LoadMoreComponent} from "./load-more.component";
import {HomeComponent} from "./home.component";

@Component({
    selector: "search-articles",
    templateUrl: "templates/search.component.html",
    directives: [ArticleComponent, LoadMoreComponent]
})

export class SearchComponent extends HomeComponent implements OnInit {
    constructor(protected _articleService:ArticleService, private _routeParams:RouteParams) {
        super(_articleService);
    }

    ngOnInit() {
        this.searchString = this._routeParams.get("searchString");
    }
}