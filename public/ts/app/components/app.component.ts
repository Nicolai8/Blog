import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HomeComponent} from "./home.component";
import {ArticleDetailComponent} from "./article-detail.component";
import {LoginComponent} from "./login.component";
import {AuthService} from "../services/auth.service";

@Component({
    selector: "my-app",
    templateUrl: "templates/app.component.html",
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    providers: [AuthService]
})

@RouteConfig([
    {path: "/", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/article/:id", name: "ArticleDetail", component: ArticleDetailComponent}
])

export class AppComponent {
}