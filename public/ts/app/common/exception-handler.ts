import {ExceptionHandler} from "@angular/core";
import {Router} from "@angular/router-deprecated";

export class CustomExceptionHandler extends ExceptionHandler {
    call(error, stackTrace = null, reason = null) {
        var params = {
            message: error,
            stackTrace: stackTrace
        };

        if (typeof error !== "string") {
            params.message = error.originalException.name;
            params.stackTrace = error.originalStack;
        }

        localStorage["customErrorHandler"] = JSON.stringify(params);
        window.location.href = "/#/error/500";
        console.dir(params);
    }

}
