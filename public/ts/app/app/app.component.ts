import {Component, OnInit} from "@angular/core";
import {Router, RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {HomeComponent} from "../articles/home.component";
import {ArticleDetailComponent} from "./../article-detail/article-detail.component";
import {LoginComponent} from "./components/login.component";
import {AuthService} from "../common/services/auth.service";
import {ArticleService} from "../common/services/article.service";
import {ProfileComponent} from "./../profile/profile.component";
import {UserArticlesComponent} from "./../articles/user-articles.component";
import {CreateArticleComponent} from "./../create-article/create-article.component";
import {SearchComponent} from "./../articles/search.component";
import {ErrorComponent} from "./../error/error.component";
import {cleanBlog} from "../clean-blog";
import {SubmitOnDirective} from "../common/directives/submit-on.directive";

@Component({
    selector: "my-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    directives: [ROUTER_DIRECTIVES, LoginComponent, SubmitOnDirective],
    providers: [AuthService, ArticleService]
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