interface RatingOptions {
    language?: string;
    starts?: number;
    glyphicon?: boolean;
    symbol?: string;
    ratingClass?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readonly?: boolean;
    rtl?: boolean;
    showClear?: boolean;
    showCaption?:boolean;
    size?: string;
    defaultCaption?:string;
    starCaptions?:Object|Function;
    starCaptionClasses?:Object|Function;
    clearButton?:string;
    clearButtonTitle?:string;
    clearButtonBaseClass?:string;
    clearButtonActiveClassм
    clearValue?:string;
    clearCaption?:string;
    clearCaptionClass?:string;
    captionElement?:string;
    clearElement?:string;
    hoverEnabled?:boolean;
    hoverChangeCaption?:boolean;
    hoverChangeStars?:boolean;
    hoverOnClear?:boolean;
}

interface JQuery {
    rating(options?:Object): JQuery;
    rating(command:string, options?:Object|string): JQuery;
}

declare module "star-rating" {
}