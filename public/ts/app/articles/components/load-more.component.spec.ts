import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, async,
    setBaseTestProviders
} from "@angular/core/testing";
import {TestComponentBuilder, ComponentFixture} from "@angular/compiler/testing";
import {Type} from "@angular/compiler/src/facade/lang";
import {LoadMoreComponent} from "./load-more.component";
import {provide} from "@angular/core";
import {ArticleService} from "../../common/services/article.service";
import {MockArticleService} from "../../common/services/article.service.mock";
import {Constants} from "../../common/constants";
import {PromiseWrapper} from "@angular/core/src/facade/promise";

export function loadMoreComponentSpec() {
    describe("LoadMoreComponent", ()=> {
        beforeEach(()=> {
            this.loadMoreComponent = new LoadMoreComponent();
        });

        it(`load more is hidden: got ${Constants.PAGE_SIZE - 1} < ${Constants.PAGE_SIZE} items`, (done)=> {
            expect(this.loadMoreComponent.isVisible).toBeFalsy();
            this.loadMoreComponent.onLoad.subscribe((event)=> {
                event.callback(Constants.PAGE_SIZE - 1);
                expect(this.loadMoreComponent.isVisible).toBeFalsy();
                done();
            });
            this.loadMoreComponent.ngOnInit();
        });

        it(`load more is visible: got ${Constants.PAGE_SIZE} = ${Constants.PAGE_SIZE} items`,
            async(inject([TestComponentBuilder], (tcb:TestComponentBuilder)=> {
                    var completer = PromiseWrapper.completer();

                    tcb.createAsync(<Type>LoadMoreComponent).then((componentFixture:ComponentFixture<any>)=> {
                        expect(this.loadMoreComponent.isVisible).toBeFalsy();
                        componentFixture.componentInstance.onLoad.subscribe((event)=> {
                            event.callback(Constants.PAGE_SIZE);
                            completer.resolve(componentFixture.componentInstance);
                        });
                        componentFixture.componentInstance.ngOnInit();
                    });

                    completer.promise.then((loadMoreComponent:LoadMoreComponent)=> {
                        expect(loadMoreComponent.isVisible).toBeTruthy();
                    });
                })
            ))
    });
}