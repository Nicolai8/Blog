import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, async,
    MockApplicationRef
} from "@angular/core/testing";
import {TestComponentBuilder, ComponentFixture} from "@angular/compiler/testing";
import {Type} from "@angular/compiler/src/facade/lang";
import {ApplicationRef, provide} from "@angular/core";
import {LocationStrategy, APP_BASE_HREF} from "@angular/common"
import {ROUTER_PROVIDERS, RouteParams, ROUTER_PRIMARY_COMPONENT} from "@angular/router-deprecated";
import {MockLocationStrategy} from "@angular/common/testing";
import {PromiseWrapper} from "@angular/core/src/facade/promise";

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
        beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
                tcb
                    .overrideProviders(<Type>ArticleDetailComponent, [
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
                    .createAsync(<Type>ArticleDetailComponent)
                    .then((componentFixture:ComponentFixture<any>) => {
                        this.componentFixture = componentFixture;
                        articleDetailComponent = componentFixture.componentInstance;
                    });
            })
        ));

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

            it("can't edit: logged use isn't owner", async(inject([AuthService], (authService)=> {
                    let completer = PromiseWrapper.completer();

                    authService.login({username: "notOwner", _id: "1"}, ()=> {
                        setTimeout(()=> {
                            completer.resolve();
                        }, 100);
                    });

                    completer.promise.then(()=> {
                        expect(articleDetailComponent.canEdit).toBeFalsy();
                    })
                })
            ));

            it("can edit", async(inject([AuthService], (authService)=> {
                    let completer = PromiseWrapper.completer();

                    authService.login({username: "name", _id: "56a0e27591518a0023bdf794"}, ()=> {
                        setTimeout(()=> {
                            completer.resolve();
                        }, 100);
                    });

                    completer.promise.then(()=> {
                        expect(articleDetailComponent.canEdit).toBeTruthy();
                    });
                })
            ));
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