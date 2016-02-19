import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";

@Injectable()

export class SocketIOService {
    private _socket;
    private _commentAddedSubject:Subject<any> = new Subject();
    private _commentDeletedSubject:Subject<any> = new Subject();
    private _commentUpdatedSubject:Subject<any> = new Subject();

    constructor() {
        var self = this;
        this._socket = io.connect("", {
            reconnectionDelay: 1
        });
        this._socket.on("commentAdded", function () {
            self._commentAddedSubject.next({});
        });
        this._socket.on("commentDeleted", function () {
            self._commentDeletedSubject.next({});
        });
        this._socket.on("commentUpdated", function () {
            self._commentUpdatedSubject.next({});
        });
    }

    commentAdded(subscription) {
        this._commentAddedSubject.subscribe(subscription);
    }

    commentDeleted(subscription) {
        return this._commentDeletedSubject.subscribe(subscription);
    }

    commentUpdated(subscription) {
        return this._commentUpdatedSubject.subscribe(subscription);
    }

    get socket() {
        return this._socket;
    }
}
