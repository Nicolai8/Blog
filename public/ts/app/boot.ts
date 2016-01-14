import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HeroService} from "./hero.service";
import {LocationStrategy,
    HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    HeroService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);