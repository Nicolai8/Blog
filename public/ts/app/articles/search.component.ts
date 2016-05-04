import {Component, OnInit} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {ArticleService} from "../common/services/article.service";
import {ArticleComponent} from "./components/article.component";
import {LoadMoreComponent} from "./components/load-more.component";
import {HomeComponent} from "./home.component";

@Component({
    selector: "search-articles",
    moduleId: module.id,
    templateUrl: "search.component.html",
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