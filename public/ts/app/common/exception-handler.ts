import {ExceptionHandler} from "angular2/core";
import {Router} from "angular2/router";

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
