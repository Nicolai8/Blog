import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";

@Component({
    selector: "create-article",
    templateUrl: "templates/create-article.component.html",
    providers: [ArticleService]
})

export class CreateArticleComponent {
    public newArticle = {
        title: "",
        subtitle: "",
        content: ""
    };

    constructor(private _articleService:ArticleService,
                private _router:Router) {
    }

    save(newArticle) {
        this._articleService.create(newArticle,
            (article)=> this._router.navigate(["ArticleDetail", {id: article._id}]));
    }
}
