import {OnActivate} from "angular2/router";
import {PromiseCompleter} from "angular2/src/facade/promise";
import {PromiseWrapper} from "angular2/src/facade/promise";
import {OnDeactivate} from "angular2/router";

export class PageComponent implements OnActivate, OnDeactivate {
    private $loader = jQuery(".loader");
    private $body = jQuery(document.body);
    protected _completer:PromiseCompleter<any> = PromiseWrapper.completer();

    beforeInit():Promise<any> {
        this._completer.resolve();
        return this._completer.promise;
    }

    routerOnActivate() {
        return this.beforeInit().then(()=> {
            this.$body.removeClass("loading");
            this.$loader.fadeOut();
        });
    }

    routerOnDeactivate() {
        let completer = PromiseWrapper.completer();
        this.$body.addClass("loading");
        this.$loader.fadeIn(() => {
            completer.resolve();
        });
        return completer.promise;
    }
}