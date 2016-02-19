import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, injectAsync,
    TestComponentBuilder,
    ComponentFixture,
    setBaseTestProviders
} from "angular2/testing";
import {LoadMoreComponent} from "./load-more.component";
import {provide} from "angular2/core";
import {ArticleService} from "../../common/services/article.service";
import {MockArticleService} from "../../common/services/article.service.mock";
import {Constants} from "../../common/constants";
import {PromiseWrapper} from "angular2/src/facade/promise";

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
            injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder)=> {
                var completer = PromiseWrapper.completer();

                tcb.createAsync(LoadMoreComponent).then((componentFixture:ComponentFixture)=> {
                    expect(this.loadMoreComponent.isVisible).toBeFalsy();
                    componentFixture.componentInstance.onLoad.subscribe((event)=> {
                        event.callback(Constants.PAGE_SIZE);
                        completer.resolve(componentFixture.componentInstance);
                    });
                    componentFixture.componentInstance.ngOnInit();
                });

                return completer.promise.then((loadMoreComponent)=> {
                    expect(loadMoreComponent.isVisible).toBeTruthy();
                });
            }))
    });
}