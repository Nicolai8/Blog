import {Comment} from "../models/comment";

export class MockCommentService {
    getByArticleId(id:string, onSuccess, onFailure?) {
        $.getJSON("/data/comments.json", (data)=> {
            onSuccess(data);
        });
    }

    create(comment, onSuccess, onFailure?) {
        onSuccess(comment);
    }

    save(comment:Comment, onSuccess, onFailure?) {
        onSuccess(comment);
    }

    remove(id:string, onSuccess, onFailure?) {
        onSuccess && onSuccess();
    }
}