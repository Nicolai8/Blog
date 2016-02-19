import {setBaseTestProviders} from "angular2/testing";
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from "angular2/platform/testing/browser";
import {homeComponentSpec} from "./articles/home.component.spec";
import {loadMoreComponentSpec} from "./articles/components/load-more.component.spec";
import {articleDetailComponentSpec} from "./article-detail/article-detail.component.spec";

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

describe("components", ()=> {
    homeComponentSpec();
    loadMoreComponentSpec();
    articleDetailComponentSpec();
});