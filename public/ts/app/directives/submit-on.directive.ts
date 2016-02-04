import {Directive, ElementRef,Input, OnInit} from "angular2/core";
import {Constants} from "../constants";

@Directive({
    selector: "[submitOn]",
    host: {
        "(keydown)": "onKeyPress($event)"
    }
})

export class SubmitOnDirective implements OnInit {
    @Input() submitOn:string;
    @Input() submitOnRef:string;
    private $element;
    private $submitOnRef;
    private _combinationKeys:any[] = [];
    private _lookupTable = Constants.KEYS_LOOKUP_TABLE;

    constructor(private _elementRef:ElementRef) {
        this.$element = jQuery(_elementRef.nativeElement);
    }

    ngOnInit() {
        let keys = this.submitOn.toLowerCase().split("+");
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            this._combinationKeys.push(this._lookupTable[key] ? this._lookupTable[key] : key.charCodeAt(0));
        }
        this.$submitOnRef = jQuery(this.submitOnRef);
    }

    onKeyPress(event) {
        let canSubmit = true;
        let keyCode = event.keyCode;

        for (let i = 0; i < this._combinationKeys.length; i++) {
            var combinationKey = this._combinationKeys[i];
            switch (true) {
                case typeof combinationKey === "string":
                    canSubmit = event[combinationKey];
                    break;
                case combinationKey == this._lookupTable["enter"]:
                    canSubmit = (keyCode == 10 && event.ctrlKey) || keyCode == 13;
                    break;
                default:
                    canSubmit = keyCode == combinationKey;
            }
            if (!canSubmit) {
                break;
            }
        }

        if (canSubmit) {
            this.$submitOnRef.trigger("click");
            event.preventDefault();
        }
    }
}
