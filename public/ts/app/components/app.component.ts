import {Component, OnInit} from "angular2/core";
import {Router, RouteConfig, RouterLink} from "angular2/router";
import {HomeComponent} from "./home.component";
import {ArticleDetailComponent} from "./article-detail.component";
import {LoginComponent} from "./login.component";
import {AuthService} from "../services/auth.service";
import {ProfileComponent} from "./profile.component";
import {UserArticlesComponent} from "./user-articles.component";
import {CreateArticleComponent} from "./create-article.component";
import {SearchComponent} from "./search.component";
import {ErrorComponent} from "./error.component";
import {cleanBlog} from "../../plugins/clean-blog";
import {CustomRouterOutletDirective} from "../directives/router-outlet.directive";

@Component({
    selector: "my-app",
    templateUrl: "templates/app.component.html",
    directives: [CustomRouterOutletDirective, RouterLink, LoginComponent],
    providers: [AuthService]
})

@RouteConfig([
    {path: "/", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/article/:id", name: "ArticleDetail", component: ArticleDetailComponent},
    {path: "/profile/:id/articles", name: "UserArticles", component: UserArticlesComponent},
    {path: "/profile/:id", name: "Profile", component: ProfileComponent},
    {path: "/create-article", name: "CreateArticle", component: CreateArticleComponent},
    {path: "/search/:searchString", name: "Search", component: SearchComponent},
    {path: "/error/:status", name: "Error", component: ErrorComponent},
    {path: "/:url", name: "NotFound", component: ErrorComponent}
])

export class AppComponent implements OnInit {
    public isAuthorized:boolean = false;

    constructor(private _authService:AuthService,
                private _router:Router) {
    }

    ngOnInit() {
        this._authService.isAuthorized.subscribe(isAuthorized=>this.isAuthorized = isAuthorized);
        cleanBlog();
    }

    search(searchString:string) {
        this._router.navigate(["Search", {searchString: searchString}]);
    }
}