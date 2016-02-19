import {DateStringPipe} from "./date-string.pipe";

describe("pipes/DateStringPipe", ()=> {
    let pipe:DateStringPipe;

    beforeEach(()=> {
        pipe = new DateStringPipe();
    });

    it("transforms 'null' to date", ()=> {
        expect(pipe.transform(null, ["yMMMMd"])).toEqual("");
    });

    it("transforms 'undefined' to date", ()=> {
        expect(pipe.transform(undefined, ["yMMMMd"])).toEqual("");
    });

    it("transforms '2016-02-05T13:32:59.273Z' to date 'February 5, 2016'", ()=> {
        expect(pipe.transform("2016-02-05T13:32:59.273Z", ["yMMMMd"])).toEqual("February 5, 2016");
    });

    it("transforms '2016-02-07T12:28:14.244Z' to date 'February 7, 2016, 3:28 PM'", ()=> {
        expect(pipe.transform("2016-02-07T12:28:14.244Z", ["yMMMMd at jm"])).toEqual("February 7, 2016, 3:28 PM");
    });
});

