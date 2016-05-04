import {Control} from "@angular/common";
import {isBlank} from "@angular/core/src/facade/lang";

export class CustomValidators {
    static email(control:Control):{[key: string]: boolean} {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return isBlank(control) || control.value == "" || EMAIL_REGEXP.test(control.value) ? null : {"email": true};
    }
}