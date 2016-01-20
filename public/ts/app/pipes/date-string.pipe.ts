import {Pipe} from "angular2/core";
import {DatePipe} from "angular2/common";

@Pipe({
    name: "dateString"
})
export class DateStringPipe extends DatePipe {
    transform(value:any, args:any[]):string {
        return super.transform(Date.parse(value), args);
    }
}