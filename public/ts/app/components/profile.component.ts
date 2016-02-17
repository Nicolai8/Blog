import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {FORM_DIRECTIVES, ControlGroup, FormBuilder} from "angular2/common";
import {PromiseWrapper} from "angular2/src/facade/promise";
import {Profile} from "../models/profile";
import {User} from "../models/user";
import {ProfileService} from "../services/profile.service";
import {AuthService} from "../services/auth.service";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {CustomValidators} from "../common/custom-validators";
import {PageComponent} from "./page.component";

@Component({
    selector: ".profile",
    templateUrl: "templates/profile.component.html",
    providers: [ProfileService],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    pipes: [DateStringPipe]
})

export class ProfileComponent extends PageComponent {
    public profile:Profile;
    public editProfileForm:ControlGroup;
    public editMode:boolean = false;
    public canEdit:boolean = false;

    constructor(private _authService:AuthService,
                private _profileService:ProfileService,
                private _router:Router,
                private _routeParams:RouteParams,
                private _formBuilder:FormBuilder) {
        super();
    }

    beforeInit() {
        let setUserCompleter = PromiseWrapper.completer();
        let profileId = this._routeParams.get("id");
        this._profileService.get(profileId, profile => {
            this.profile = profile;
            this._completer.resolve();
        });
        this._authService.user.subscribe(user=> {
            this.canEdit = user && profileId == user["_id"];
            setUserCompleter.resolve();
        });

        return Promise.all([
            setUserCompleter.promise,
            this._completer.promise
        ]);
    }

    edit() {
        this.editProfileForm = this._formBuilder.group({
            email: [this.profile.email, CustomValidators.email],
            birthday: this.profile.birthday,
            gender: this.profile.gender,
            about: this.profile.about,
        });

        this.editMode = true;
    }

    cancel() {
        this.editMode = false;
    }

    save() {
        let editProfile = jQuery.extend({}, this.profile, this.editProfileForm.value);
        this._profileService.save(editProfile,
            ()=> {
                this.editMode = false;
                this.profile = editProfile;
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
