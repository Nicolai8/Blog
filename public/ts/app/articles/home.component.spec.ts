import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, injectAsync,
    MockApplicationRef,
    TestComponentBuilder,
    ComponentFixture
} from "angular2/testing";
import {ROUTER_PROVIDERS} from "angular2/router";
import {ApplicationRef} from "angular2/core";
import {LocationStrategy,APP_BASE_HREF} from "angular2/router";
import {MockLocationStrategy} from "angular2/router/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";

import {HomeComponent} from "./home.component";
import {provide} from "angular2/core";
import {ArticleService} from "../common/services/article.service";
import {MockArticleService} from "../common/services/article.service.mock";
import {PromiseWrapper} from "angular2/src/facade/promise";
import {Constants} from "../common/constants";
import {AppComponent} from "./../app/app.component";

export function homeComponentSpec() {
    describe("HomeComponent", ()=> {
        beforeEachProviders(()=> [
            provide(ArticleService, {useClass: MockArticleService}),
            ROUTER_PROVIDERS,
            provide(APP_BASE_HREF, {useValue: '/'}),
            provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
            provide(LocationStrategy, {useClass: MockLocationStrategy}),
            provide(ApplicationRef, {useClass: MockApplicationRef}),
        ]);

        it("should render list of 4", injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder)=> {
            var completer = PromiseWrapper.completer();
            tcb.createAsync(HomeComponent).then((componentFixture:ComponentFixture)=> {
                componentFixture.componentInstance.getNextPage({
                    page: 1,
                    pageSize: Constants.PAGE_SIZE,
                    callback: (loadedArticles)=> {
                        expect(loadedArticles).toEqual(4);
                        componentFixture.detectChanges();
                        completer.resolve(componentFixture);
                    }
                });
            });

            return completer.promise.then((homeComponent)=> {
                var $articles = $(homeComponent.nativeElement).find(".articles").children("article");
                expect($articles.length).toEqual(4);
            });
        }))
    });
}