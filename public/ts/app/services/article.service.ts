import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import {Article} from "../models/article";
import "rxjs/add/operator/map";

@Injectable()

export class ArticleService {
    constructor(private _http:Http) {
    }

    get(searchQuery, onSuccess?, onFailure?) {
        let _get = this._http.get("/article/" + searchQuery);
        _get.map(res => res.json())
            .subscribe((articles)=> {
                    articles.forEach(article=> article.created = new Date(article.created));
                    onSuccess(articles);
                },
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }

    getById(id:string, onSuccess?, onFailure?) {
        this._http.get("/article/getById/" + id)
            .map(res => res.json())
            .subscribe((article)=> {
                    article.created = new Date(article.created);
                    onSuccess(article);
                },
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }

    create(article:Article, onSuccess?, onFailure?) {
        this._http.post("/article", JSON.stringify(article))
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                });
    }

    save(article:Article, onSuccess?, onFailure?) {
        this._http.put("/article/" + article._id, JSON.stringify(article))
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }

    remove(id:string, onSuccess?, onFailure?) {
        this._http.delete("/article/" + id)
            .map(res => res.json())
            .subscribe(onSuccess,
                err => {
                    console.log(err);
                    onFailure && onFailure(err);
                }
            );
    }
}
