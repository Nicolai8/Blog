import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: "main",
    templateUrl: "templates/home.component.html",
    providers: [ArticleService],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent implements OnInit {
    public articles:Article[] = [];

    constructor(private _articleService:ArticleService) {
    }

    ngOnInit() {
        this._articleService.get("",
            articles => this.articles = articles,
            ()=> {
            }
        );
    }
}