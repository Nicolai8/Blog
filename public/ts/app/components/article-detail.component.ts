import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {RouteParams} from "angular2/router";

@Component({
    selector: "article-detail",
    templateUrl: "templates/article-detail.component.html",
    providers: [ArticleService],
    directives: [],
    inputs: ["article"]
})

export class ArticleDetailComponent implements OnInit {
    public article:Article;

    constructor(private _articleService:ArticleService, private _routeParams:RouteParams) {
    }

    ngOnInit() {
        let articleId = this._routeParams.get("id");
        this._articleService.getById(articleId,
            article => this.article = article,
            ()=> {
                //404
            }
        );
    }
}
