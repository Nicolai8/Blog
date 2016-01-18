import {Component} from "angular2/core";
import {ArticleService} from "../services/article.service";
import {CommentService} from "../services/comment.service";
import {AuthService} from "../services/auth.service";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";
import {HTTP_BINDINGS} from "angular2/http";
import {HomeComponent} from "./home.component";
import {ArticleDetailComponent} from "./article-detail.component";

@Component({
    selector: "my-app",
    templateUrl: "templates/app.component.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [CommentService, AuthService]
})

@RouteConfig([
        {path: "/", name: "Home", component: HomeComponent, useAsDefault: true},
        {path: "/article/:id", name: "ArticleDetail", component: ArticleDetailComponent}
])

export class AppComponent {
}