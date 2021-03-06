import {Component,Directive, Output, Input, OnInit, ElementRef, EventEmitter, OnDestroy} from "@angular/core";
import {Article} from "../../common/models/article";
import {ArticleService} from "../../common/services/article.service";
import {AuthService} from "../../common/services/auth.service";
import {} from "@angular/core";

@Directive({
    selector: "input.rating",
})

export class RatingDirective implements OnInit, OnDestroy {
    @Output() changed = new EventEmitter<string>();
    @Input() article:Article;
    private $element;
    private _options;
    private _updateRatingBind: Function;

    constructor(private _elementRef:ElementRef, private _articleService:ArticleService, private _authService:AuthService) {
        this.$element = jQuery(_elementRef.nativeElement);
    }

    ngOnInit() {
        var self = this;
        this._options = this.$element.data();
        this._updateRatingBind = this._updateRating.bind(this);

        this.$element.rating(this._options).on("rating.change", self._updateRatingBind);

        this._authService.isAuthorized.subscribe(isAuthorized=> {
            if (isAuthorized) {
                this._articleService.getRatingForUser(this.article._id,
                    (rating)=> {
                        this.$element.rating("update", rating);
                    });
            }
        });
    }

    ngOnDestroy() {
        this.$element.off("rating.change",this._updateRatingBind);
    }

    private _updateRating(e, rating) {
        this._articleService.setRating(this.article, {rating: rating},
            (newArticleRating)=> {
                this.changed.emit(newArticleRating);
            });
    }
}
