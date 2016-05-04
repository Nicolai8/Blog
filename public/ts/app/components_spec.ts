import {setBaseTestProviders} from "@angular/core/testing";
import {TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS} from "@angular/platform-browser-dynamic/testing";
import {homeComponentSpec} from "./articles/home.component.spec";
import {loadMoreComponentSpec} from "./articles/components/load-more.component.spec";
import {articleDetailComponentSpec} from "./article-detail/article-detail.component.spec";

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

describe("components", ()=> {
    homeComponentSpec();
    loadMoreComponentSpec();
    articleDetailComponentSpec();
});