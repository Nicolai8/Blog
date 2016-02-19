import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, injectAsync,
    MockApplicationRef,
    TestComponentBuilder,
    ComponentFixture
} from "angular2/testing";
import {ApplicationRef, provide} from "angular2/core";
import {ROUTER_PROVIDERS, RouteParams, ROUTER_PRIMARY_COMPONENT, LocationStrategy, APP_BASE_HREF} from "angular2/router";
import {MockLocationStrategy} from "angular2/router/testing";
import {PromiseWrapper} from "angular2/src/facade/promise";

import {ArticleDetailComponent} from "./article-detail.component";
import {AppComponent} from "./../app/app.component";

import {ArticleService} from "../common/services/article.service";
import {CommentService} from "../common/services/comment.service";
import {AuthService} from "../common/services/auth.service";
import {SocketIOService} from "../common/services/socket-io.service";

import {MockArticleService} from "../common/services/article.service.mock";
import {MockCommentService} from "../common/services/comment.service.mock";
import {MockAuthService} from "../common/services/auth.service.mock";
import {MockSocketIOService} from "../common/services/socket-io.service.mock";

export function articleDetailComponentSpec() {
    describe("ArticleDetailComponent", ()=> {
        var articleDetailComponent:ArticleDetailComponent;
        beforeEachProviders(()=> {
            return [provide(AuthService, {useClass: MockAuthService})];
        });
        beforeEach(injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            return tcb
                .overrideProviders(ArticleDetailComponent, [
                    provide(ArticleService, {useClass: MockArticleService}),
                    provide(CommentService, {useClass: MockCommentService}),
                    provide(SocketIOService, {useClass: MockSocketIOService}),
                    provide(RouteParams, {useClass: MockRouteParams}),
                    ROUTER_PROVIDERS,
                    provide(APP_BASE_HREF, {useValue: '/'}),
                    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
                    provide(LocationStrategy, {useClass: MockLocationStrategy}),
                    provide(ApplicationRef, {useClass: MockApplicationRef})
                ])
                .createAsync(ArticleDetailComponent)
                .then((componentFixture:ComponentFixture) => {
                    this.componentFixture = componentFixture;
                    articleDetailComponent = componentFixture.componentInstance;
                });
        }));

        afterAll(()=> {
            this.componentFixture.destroy();
        });

        describe("editing", ()=> {
            beforeEach((done)=> {
                articleDetailComponent.routerOnActivate().then(()=> {
                    done();
                });
            });

            it("can't edit: not logged in", inject([AuthService], (authService)=> {
                authService.user.subscribe(()=> {
                    expect(articleDetailComponent.canEdit).toBeFalsy();
                });
            }));

            it("can't edit: logged use isn't owner", injectAsync([AuthService], (authService)=> {
                let completer = PromiseWrapper.completer();

                authService.login({username: "notOwner", _id: "1"}, ()=> {
                    setTimeout(()=> {
                        completer.resolve();
                    }, 100);
                });

                return completer.promise.then(()=> {
                    expect(articleDetailComponent.canEdit).toBeFalsy();
                })
            }));

            it("can edit", injectAsync([AuthService], (authService)=> {
                let completer = PromiseWrapper.completer();

                authService.login({username: "name", _id: "56a0e27591518a0023bdf794"}, ()=> {
                    setTimeout(()=> {
                        completer.resolve();
                    }, 100);
                });

                return completer.promise.then(()=> {
                    expect(articleDetailComponent.canEdit).toBeTruthy();
                });
            }));
        });

        describe("comments", ()=> {
            beforeEach((done)=> {
                articleDetailComponent.routerOnActivate().then(()=> {
                    $.getJSON("/data/comment.json", (comment)=> {
                        this.comment = comment;
                    });

                    this.componentFixture.detectChanges();
                    done();
                });
            });

            it("should render 1 comment", ()=> {
                let $comments = $(this.componentFixture.nativeElement).find(".comments").children(".comment");
                expect($comments.length).toEqual(1);
            });

            it("should add 1 comment and render 2 comments", ()=> {
                let $comments = $(this.componentFixture.nativeElement).find(".comments");
                expect($comments.children(".comment").length).toEqual(1);
                articleDetailComponent.onCommentAdded(this.comment);
                this.componentFixture.detectChanges();
                expect($comments.children(".comment").length).toEqual(2);
            });

            it("should remove 1 comment and render 1 comments", ()=> {
                let $comments = $(this.componentFixture.nativeElement).find(".comments");
                expect($comments.children(".comment").length).toEqual(1);
                articleDetailComponent.onCommentAdded(this.comment);
                this.componentFixture.detectChanges();
                expect($comments.children(".comment").length).toEqual(2);
                articleDetailComponent.onCommentRemoved(this.comment);
                this.componentFixture.detectChanges();
                expect($comments.children(".comment").length).toEqual(1);
            });
        });
    });
}

class MockRouteParams extends RouteParams {
    constructor() {
        super({
            "id": "56b4a48b599fa6242c35ef7e",
        });
    }
}