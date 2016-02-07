/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */
// Navigation Scripts to Show Header on Scroll-Up

export function cleanBlog() {
    let $ = jQuery;
    let MQL = 1170;

//primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $(".navbar-custom").height();
        $(window).on("scroll", {
                previousTop: 0
            },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $(".navbar-custom").hasClass("is-fixed")) {
                        $(".navbar-custom").addClass("is-visible");
                    } else {
                        $(".navbar-custom").removeClass("is-visible is-fixed");
                    }
                } else {
                    //if scrolling down...
                    $(".navbar-custom").removeClass("is-visible");
                    if (currentTop > headerHeight && !$(".navbar-custom").hasClass("is-fixed")) $(".navbar-custom").addClass("is-fixed");
                }
                this.previousTop = currentTop;
            });
    }

    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
}