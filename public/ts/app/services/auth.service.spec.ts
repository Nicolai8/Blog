import {
    beforeEach, beforeEachProviders,
    describe, expect,
    it,
    inject, injectAsync,
    MockApplicationRef
} from "angular2/testing";
import {provide} from "angular2/core";
import {HttpService} from "./http.service";
import {MockHttpService} from "./http.service.mock";
import {AuthService} from "./auth.service";
import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {ApplicationRef} from "angular2/core";
import {LocationStrategy,APP_BASE_HREF} from "angular2/router";
import {MockLocationStrategy} from "angular2/router/testing";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {PromiseWrapper} from "angular2/src/facade/promise";

describe("services/AuthService", ()=> {
    beforeEachProviders(()=> {
        return [
            ROUTER_PROVIDERS,
            provide(APP_BASE_HREF, {useValue: '/'}),
            provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppCmp}),
            provide(LocationStrategy, {useClass: MockLocationStrategy}),
            provide(ApplicationRef, {useClass: MockApplicationRef}),
            HTTP_PROVIDERS,
            provide(HttpService, {useClass: MockHttpService}),
            AuthService
        ];
    });

    describe("window[user]==undefined", ()=> {
        it("user is undefined", inject([AuthService], (authService)=> {
            expect(authService.user.getValue()).toBeUndefined();
        }));

        it("isn't authorized", inject([AuthService], (authService)=> {
            expect(authService.isAuthorized.getValue()).toBeFalsy();
        }));

        it("login", injectAsync([AuthService], authService=> {
            expect(authService.user.getValue()).toBeUndefined();

            var completer = PromiseWrapper.completer();
            authService.login({
                username: "test"
            }, ()=> {
                completer.resolve();
            });

            return completer.promise.then(()=> {
                expect(authService.user.getValue().username).toEqual("test");
            });
        }));
    });

    describe("window[user]!=undefined", ()=> {
        afterEach(()=> {
            delete window["user"];
        });

        beforeEach(()=> {
            window["user"] = {
                username: "testWindow"
            };
        });

        it("logged on page load: window['user']!=null", inject([AuthService], (authService)=> {
            expect(authService.user.getValue().username).toEqual("testWindow");
        }));
    });
});

class AppCmp {
}