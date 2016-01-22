import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {ArticleComponent} from "./article.component";

@Component({
    selector: "main",
    templateUrl: "templates/home.component.html",
    providers: [ArticleService],
    directives: [ArticleComponent]
})

export class HomeComponent implements OnInit {
    public articles:Article[] = [];

    constructor(private _articleService:ArticleService) {
    }

    ngOnInit() {
        this._articleService.get("",
            articles => this.articles = articles
        );
    }
}
