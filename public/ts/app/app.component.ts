import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Hero} from "./hero";
import {HeroService} from "./hero.service"
import {HeroDetailComponent} from './hero-detail.component';

@Component({
    selector: "my-app",
    template: `
        <h2>My Heroes</h2>
        <ul class="list-unstyled heroes col-xs-12 col-sm-4 col-md-2">
            <li *ngFor = "#hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <my-hero-detail [hero]="selectedHero"></my-hero-detail>
    `,
    directives: [HeroDetailComponent],
    providers: [HeroService]
})

export class AppComponent implements OnInit {
    public title = "Tour of Heroes";
    public heroes:Hero[];
    public selectedHero:Hero;

    constructor(private _heroService:HeroService) {
    }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    onSelect(hero:Hero) {
        this.selectedHero = hero;
    }
}