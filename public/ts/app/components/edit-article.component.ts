import {Component, Output, EventEmitter} from "angular2/core";
import {ArticleService} from "../services/article.service";
import {Article} from "../models/article";

@Component({
    selector: "edit-article",
    templateUrl: "templates/edit-article.component.html",
    providers: [ArticleService],
    inputs: ["article"]
})

export class EditArticleComponent {
    @Output() updated:EventEmitter<any> = new EventEmitter();
    public article:Article;
    public editArticle:Article;

    constructor(private _articleService:ArticleService) {
    }

    edit() {
        this.editArticle = Object.assign({}, this.article);
    }

    save(event) {
        this._articleService.save(this.editArticle,
            (article)=> {
                this.article = this.editArticle;
                this.updated.emit(this.article);
                $(event.target).closest(".modal").modal("hide");
            });
    }
}
