import {Component} from "angular2/core";
import {Article} from "../models/article";
import {ArticleService} from "../services/article.service";
import {ArticleComponent} from "./article.component";
import {LoadMoreComponent} from "./load-more.component";
import {PageComponent} from "./page.component";

@Component({
    selector: "main",
    templateUrl: "templates/home.component.html",
    directives: [ArticleComponent, LoadMoreComponent]
})

export class HomeComponent extends PageComponent {
    public articles:Article[] = [];
    public searchString:string = "";
    protected _getArticles:Function;

    constructor(protected _articleService:ArticleService) {
        super();
        this._getArticles = _articleService.get.bind(_articleService);
    }

    getNextPage(event) {
        var self = this;
        this._getArticles(`${this.searchString}?page=${event.page}&pageSize=${event.pageSize}`, (articles)=> {
            self.articles.push(...articles);
            event.callback && event.callback(articles.length);
        })
    }
}
