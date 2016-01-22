import {Component, OnInit} from "angular2/core";
import {Article} from "../models/article";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {DateStringPipe} from "../pipes/date-string.pipe";

@Component({
    selector: "article",
    templateUrl: "templates/article.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: [DateStringPipe],
    inputs: ["article", "userId"]
})

export class ArticleComponent {
}
