import {Component} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {ArticleComponent} from "./article.component";
import {LoadMoreComponent} from "./load-more.component";

@Component({
    selector: "main",
    templateUrl: "templates/home.component.html",
    providers: [ArticleService],
    directives: [ArticleComponent, LoadMoreComponent]
})

export class HomeComponent {
    public articles:Article[] = [];

    constructor(private _articleService:ArticleService) {
    }

    getNextPage(event) {
        var self = this;
        this._articleService.get(`?page=${event.page}&pageSize=${event.pageSize}`,
            (articles)=> {
                self.articles.push(...articles);
                event.callback && event.callback(articles.length);
            })
    }
}
