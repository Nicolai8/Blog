/// <reference path="../../definitions/jquery.d.ts"/>
import {Promise,PromiseWrapper} from "angular2/src/facade/async";
import {Directive, ElementRef, DynamicComponentLoader} from "angular2/core";
import {Router, RouterOutlet, ComponentInstruction} from "angular2/router";

@Directive({
    selector: "router-outlet"
})
export class CustomRouterOutletDirective extends RouterOutlet {
    private $loader = jQuery(".loader");
    private $body =jQuery(document.body);

    constructor(_elementRef:ElementRef,
                _loader:DynamicComponentLoader,
                _parentRouter:Router,
                nameAttr:string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
    }

    activate(instruction:ComponentInstruction) {
        let promise = super.activate(instruction);
        this.$body.removeClass("loading");
        promise.then(()=>this.$loader.fadeOut());
        return promise;
    }

    deactivate(nextInstruction:ComponentInstruction) {
        this.$body.addClass("loading");
        this.$loader.show();
        return super.deactivate(nextInstruction);
    }
}