import {Component, OnInit} from "angular2/core";
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {RouteParams} from "angular2/router";

@Component({
    selector: "my-hero-detail",
    templateUrl: "templates/hero-detail.component.html",
    inputs: ["hero"]
})

export class HeroDetailComponent implements OnInit {
    public hero:Hero;

    constructor(private _heroService:HeroService, private _routerParams:RouteParams) {
    }

    ngOnInit() {
        if (!this.hero) {
            let id = +this._routerParams.get("id");
            this._heroService.getHero(id).then(hero => this.hero = hero);
        }
    }

    goBack() {
        window.history.back();
    }
}