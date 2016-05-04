import {Pipe} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
    name: "dateString"
})
export class DateStringPipe extends DatePipe {
    transform(value: any, pattern?: string):string {
        if (!value) {
            return "";
        }
        return super.transform(Date.parse(value), pattern || "");
    }
}