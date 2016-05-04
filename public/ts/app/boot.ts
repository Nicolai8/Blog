import {bootstrap}    from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app/app.component";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {provide, ExceptionHandler} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {HttpService} from "./common/services/http.service";
import {LocationStrategy, HashLocationStrategy} from "@angular/common"
import {CustomExceptionHandler} from "./common/exception-handler";

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