import {Component} from "angular2/core";
import {OnInit} from "angular2/core";
import {Profile} from "../models/profile";
import {ProfileService} from "../services/profile.service";
import {RouteParams} from "angular2/router";
import {AuthService} from "../services/auth.service";
import {Router} from "angular2/router";
import {User} from "../models/user";
import {DateStringPipe} from "../pipes/date-string.pipe";

@Component({
    selector: ".profile",
    templateUrl: "templates/profile.component.html",
    providers: [ProfileService],
    pipes: [DateStringPipe]
})

export class ProfileComponent implements OnInit {
    public profile:Profile;
    public editProfile:Profile;
    public editMode:boolean = false;
    public canEdit:boolean = false;

    constructor(private _authService:AuthService,
                private _profileService:ProfileService,
                private _router:Router,
                private _routeParams:RouteParams) {
    }

    ngOnInit() {
        var profileId = this._routeParams.get("id");
        this._profileService.get(profileId, profile => this.profile = profile);
        this._authService.user.subscribe(user=> this.canEdit = user && profileId == user["_id"]);
    }

    edit() {
        this.editProfile = Object.assign({}, this.profile);
        this.editMode = true;
    }

    cancel() {
        this.editMode = false;
    }

    save() {
        this._profileService.save(this.editProfile,
            ()=> {
                this.editMode = false;
                this.profile = this.editProfile;
            });
    }

    remove() {
        if (confirm("are you sure?")) {
            this._profileService.remove(()=> {
                this._authService.isAuthorized.next(false);
                this._authService.user.next(new User(""));
                this._router.navigate(["Home"]);
            });
        }
    }
}
