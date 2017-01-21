import $ from 'jquery';
import smoothScrool from 'jquery-smooth-scroll';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader {
    
    constructor() {
        this.lazyImages = $(".lazyload");
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.createHeaderWaypoint();
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");
        this.createPageSectionWaypoints();
        this.resetPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }
    
    refreshWaypoints() {
        this.lazyImages.on("load", function() {
            Waypoint.refreshAll();
        });
    }
    
    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }
    
    createHeaderWaypoint() {
        var that = this;
        //jQueryObject[0] - pointer to native DOM element
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
               if (direction == "down") {
                   that.siteHeader.addClass("site-header--dark"); 
               } else {
                   that.siteHeader.removeClass("site-header--dark");
               }
            }
        });
    }
    
    createPageSectionWaypoints() {
        var that = this;
        this.pageSections.each(function() {
            var currentPageSection = this;
            new Waypoint({
               element: currentPageSection,
               handler: function(direction){
                   if (direction == "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link"); 
                    }

               },
               offset: "18%"
            });
            new Waypoint({
               element: currentPageSection,
               handler: function(direction){
                   if (direction == "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link"); 
                    }
               },
               offset: "-40%"
           });
        });
    }
    resetPageSectionWaypoints() {
        var that = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
               if (direction == "up") {
                   that.headerLinks.removeClass("is-current-link");
               }
            },
            offset: "-30%"
        });
    }
}

export default StickyHeader;