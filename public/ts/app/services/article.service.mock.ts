import {Article} from "../models/article";

export class MockArticleService {
    get(searchQuery:string, onSuccess, onFailure?) {
        $.getJSON("/data/articles.json", (data)=> {
            onSuccess(data);
        });
    }

    getById(id:string, onSuccess, onFailure?) {
        $.getJSON("/data/article.json", (data)=> {
            onSuccess(data);
        });
    }

    getByUserId(id:string, onSuccess, onFailure?) {
        $.getJSON("/data/articles.json", (data)=> {
            onSuccess(data);
        });
    }

    getRatingForUser(id:string, onSuccess, onFailure?) {
        onSuccess(8);
    }

    create(article:Article, onSuccess?, onFailure?) {
        onSuccess(article);
    }

    save(article:Article, onSuccess?, onFailure?) {
        onSuccess(article);
    }

    setRating(article:Article, newRating, onSuccess?, onFailure?) {
        onSuccess(newRating);
    }

    remove(id:string, onSuccess?, onFailure?) {
        onSuccess();
    }
}
