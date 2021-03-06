import {Component, OnInit, EventEmitter, Input, Output} from "@angular/core";
import {Constants} from "../../common/constants";

@Component({
    selector: "load-more",
    moduleId: module.id,
    templateUrl: "load-more.component.html",
})

export class LoadMoreComponent implements OnInit {
    public isVisible:boolean = false;
    @Output() onLoad = new EventEmitter();
    private _pageNumber:number = 1;

    ngOnInit() {
        this.loadNew();
    }

    loadNew() {
        var self = this;
        this.onLoad.emit({
            page: this._pageNumber,
            pageSize: Constants.PAGE_SIZE,
            callback: (countOfLoaded)=> {
                self.isVisible = countOfLoaded == Constants.PAGE_SIZE;
                self._pageNumber++;
            }
        });
    }
}
