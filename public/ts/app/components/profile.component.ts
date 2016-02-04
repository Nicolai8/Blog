import {Component, OnInit} from "angular2/core";
import {Router, RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {Profile} from "../models/profile";
import {User} from "../models/user";
import {ProfileService} from "../services/profile.service";
import {AuthService} from "../services/auth.service";
import {DateStringPipe} from "../pipes/date-string.pipe";
import {FORM_DIRECTIVES, ControlGroup, FormBuilder} from "angular2/common";
import {CustomValidators} from "../common/custom-validators";

@Component({
    selector: ".profile",
    templateUrl: "templates/profile.component.html",
    providers: [ProfileService],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    pipes: [DateStringPipe]
})

export class ProfileComponent implements OnInit {
    public profile:Profile;
    public editProfileForm:ControlGroup;
    public editMode:boolean = false;
    public canEdit:boolean = false;

    constructor(private _authService:AuthService,
                private _profileService:ProfileService,
                private _router:Router,
                private _routeParams:RouteParams,
                private _formBuilder:FormBuilder) {
    }

    ngOnInit() {
        var profileId = this._routeParams.get("id");
        this._profileService.get(profileId, profile => this.profile = profile);
        this._authService.user.subscribe(user=> this.canEdit = user && profileId == user["_id"]);
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
