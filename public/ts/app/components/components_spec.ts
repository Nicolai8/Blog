import {setBaseTestProviders} from "angular2/testing";
import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from "angular2/platform/testing/browser";
import {homeComponentSpec} from "./home.component.spec";
import {loadMoreComponentSpec} from "./load-more.component.spec";
import {articleDetailComponentSpec} from "./article-detail.component.spec";

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

describe("components", ()=> {
    homeComponentSpec();
    loadMoreComponentSpec();
    articleDetailComponentSpec();
});