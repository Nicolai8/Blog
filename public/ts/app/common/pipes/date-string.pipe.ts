import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

@Pipe({
    name: "dateString"
})
export class DateStringPipe implements PipeTransform{
    transform(value: any, pattern?: string):string {
        if (!value) {
            return "";
        }
        let datePipe = new DatePipe();
        return datePipe.transform(Date.parse(value), pattern);
    }
}