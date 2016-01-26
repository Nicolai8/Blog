import {Component, OnInit} from "angular2/core";
import {RouteParams} from "angular2/router";

@Component({
    selector: "error",
    templateUrl: "templates/error.component.html"
})

export class ErrorComponent implements OnInit {
    public status:number;
    public message:string;
    public stackTrace: string;

    constructor(private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.status = +this._routeParams.get("status") || 404;
        this.message = this._routeParams.get("message") || "Not Found";
        this.stackTrace = this._routeParams.get("stack");
    }
}
