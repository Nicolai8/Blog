/// <reference path="../../definitions/socket.io-client.d.ts"/>
import {Subject} from "rxjs/Subject";

export class MockSocketIOService {
    private _socket;
    private _commentAddedSubject:Subject<any> = new Subject();
    private _commentDeletedSubject:Subject<any> = new Subject();
    private _commentUpdatedSubject:Subject<any> = new Subject();

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
