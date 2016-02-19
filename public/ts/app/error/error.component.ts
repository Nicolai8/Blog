import {Component, OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";
import {PageComponent} from "../common/components/page.component";

@Component({
    selector: "error",
    moduleId: module.id,
    template: `
    <header class="intro-header" style="background-image: url('../../../images/home-bg.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="site-heading">
                        <h1>{{status}}</h1>
                        <hr class="small">
                        <span class="subheading">{{message}}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="container" *ngIf="stackTrace">
        <pre>{{stackTrace}}</pre>
    </div>
    `
})

export class ErrorComponent extends PageComponent implements OnInit {
    public status:string;
    public message:string;
    public stackTrace:string;

    constructor(private _routeParams:RouteParams) {
        super();
    }

    ngOnInit() {
        var error = localStorage["customErrorHandler"] ? JSON.parse(localStorage["customErrorHandler"]) : {};
        this.status = this._routeParams.get("status") || "404";
        this.message = this._routeParams.get("message") || error.message || "Not Found";
        this.stackTrace = this._routeParams.get("stack") || error.stackTrace;
        localStorage.removeItem("customErrorHandler");
    }
}
