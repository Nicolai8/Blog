import {Component} from "angular2/core";

interface Hero {
    "id": number;
    name: string;
}

var HEROES:Hero[] = [
    {"id": 11, "name": "Mr. Nice"},
    {"id": 12, "name": "Narco"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}
];


@Component({
    selector: "my-app",
    template: `
        <h2>My Heroes</h2>
        <ul class="list-unstyled heroes col-xs-12 col-sm-4 col-md-2">
            <li *ngFor = "#hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
            </li>
        </ul>
        <div *ngIf="selectedHero">
            <h2>{{selectedHero.name}} details!</h2>
            <div><label>id: </label>{{selectedHero.id}}</div>
            <div>
                <label>name: </label>
                <input [(ngModel)]="selectedHero.name" placeholder="name">
            </div>
        </div>
    `,
    styles: [
        ``
    ]
})

export class AppComponent {
    public title = "Tour of Heroes";
    public heroes = HEROES;
    public selectedHero:Hero;

    onSelect(hero:Hero) {
        this.selectedHero = hero;
    }
}