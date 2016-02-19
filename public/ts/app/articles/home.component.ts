import {Component} from "angular2/core";
import {Article} from "../common/models/article";
import {ArticleService} from "../common/services/article.service";
import {ArticleComponent} from "./components/article.component";
import {LoadMoreComponent} from "./components/load-more.component";
import {PageComponent} from "../common/components/page.component";

@Component({
    selector: "main",
    moduleId: module.id,
    templateUrl: "home.component.html",
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
