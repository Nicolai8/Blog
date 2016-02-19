import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {ArticleService} from "../common/services/article.service";
import {Article} from "../common/models/article";
import {PageComponent} from "../common/components/page.component";

@Component({
    selector: "create-article",
    moduleId: module.id,
    templateUrl: "create-article.component.html",
    providers: [ArticleService]
})

export class CreateArticleComponent extends PageComponent {
    constructor(private _articleService:ArticleService,
                private _router:Router) {
        super();
    }

    save(newArticle) {
        this._articleService.create(newArticle,
            (article)=> this._router.navigate(["ArticleDetail", {id: article._id}]));
    }
}