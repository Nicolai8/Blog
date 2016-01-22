import {Component, OnInit} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {HomeComponent} from "./home.component";
import {ArticleDetailComponent} from "./article-detail.component";
import {LoginComponent} from "./login.component";
import {AuthService} from "../services/auth.service";
import {ProfileComponent} from "./profile.component";
import {UserArticlesComponent} from "./user-articles.component";
import {CreateArticleComponent} from "./create-article.component";

@Component({
    selector: "my-app",
    templateUrl: "templates/app.component.html",
    directives: [ROUTER_DIRECTIVES, LoginComponent],
    providers: [AuthService]
})

@RouteConfig([
    {path: "/", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/article/:id", name: "ArticleDetail", component: ArticleDetailComponent},
    {path: "/profile/:id/articles", name: "UserArticles", component: UserArticlesComponent},
    {path: "/profile/:id", name: "Profile", component: ProfileComponent},
    {path: "/create-article", name: "CreateArticle", component: CreateArticleComponent}
])

export class AppComponent implements OnInit {
    public isAuthorized:boolean = false;

    constructor(private _authService:AuthService) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized=>this.isAuthorized = isAuthorized);
    }
}