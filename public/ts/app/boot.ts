import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./components/app.component";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {HttpService} from "./services/http.service";
import {ExceptionHandler} from "angular2/core";
import {CustomExceptionHandler} from "./exception-handler";

//remove #_=_
if (window.location.hash && window.location.hash === "#_=_") {
    if (window.history) {
        window.history.pushState("", document.title, window.location.pathname);
    } else {
        window.location.hash = "";
    }
}

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HttpService,
    // provide(ExceptionHandler, {useClass: CustomExceptionHandler})
]);