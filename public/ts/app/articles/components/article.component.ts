import {Component, OnInit} from "angular2/core";
import {Article} from "../../common/models/article";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {DateStringPipe} from "../../common/pipes/date-string.pipe";

@Component({
    selector: "article",
    moduleId: module.id,
    templateUrl: "article.component.html",
    directives: [ROUTER_DIRECTIVES],
    pipes: [DateStringPipe],
    inputs: ["article", "userId"]
})

export class ArticleComponent {
}
