import {Profile} from "../models/profile";

export class MockProfileService {

    get(id:string, onSuccess?, onFailure?) {
        $.getJSON("/data/profile.json", (data)=> {
            onSuccess(data);
        });
    }

    save(profile:Profile, onSuccess?, onFailure?) {
        onSuccess && onSuccess(profile);
    }

    remove(onSuccess?, onFailure?) {
        onSuccess();
    }
}
