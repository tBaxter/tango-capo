/***********************************************
* Stickit allows for multiple sticky elements,
* allows them be combined with a sticky header,
* allows for expanding/collapsing header navigation,
* and prevents overflow of the sticky element to the
* header or footer.
*
* The sticky sidebar functionality is heavily based on
* stickymojo.js: http://mojotech.github.com/stickymojo/
* If that's all you need, then it's probably better.
*
* If using a collapsing header,
* hide/show content in the nav based on body.collapsed
*
* Initialization:
* Pass a class name for the elements you want to be sticky,
* along with some variables:
*
* $(window).load(function() {
    $('.sticky').stickit({
    content: '#content-main', // your main content wrapper (not the sidebar)
    footer:  '#footer',
    header:  '#header'
  });
});

* additional settings:
* - stickHeader: false      (if header should not stick)
* - collapseHeader: false   (no collapsing will be done)

**************************************************/

(function($) {
  $.fn.extend({
    stickit: function(options) {
      var $stickyElements = $(this);
      var settings = $.extend({
        'debug': 'false',
        'stickHeader': true,
        'collapseHeader': true,
        'header': $('#masthead'),
        'footer': $('#footer'),
        'content': $('content-main')
      }, options);

      var errors = [];
      for (var key in settings) {
        if (!settings[key]) {
          errors.push(settings[key]);
        }
      }
      if (errors.length) {
        console.warn(errors);
        return false;
      }
      // we're going to compute the content top position
      // based on the first element AFTER the header,
      // in case there is any margin/padding oddness.
      var winPos;
      var limits;
      var $firstContent = settings.header.next();
      var contentOffset = $firstContent.offset().top;
      var headerHeight = settings.header.outerHeight();

      // Header helpers
      function collapseHeader() {
          collapsed = true;
          $body.addClass('collapsed');
          if (settings.stickHeader) {
            stickHeader();
          }
          headerHeight = settings.header.outerHeight();
      }
      function unCollapseHeader() {
        collapsed = false;
        $body.removeClass('collapsed');
        if (settings.stickHeader) {
          unStickHeader();
        }
        headerHeight = settings.header.outerHeight();
      }
      function stickHeader() {
        settings.header.css('position', 'fixed');
        $firstContent.css('margin-top', contentOffset);
      }
      function unStickHeader() {
        settings.header.css('position', 'static');
        $firstContent.css('margin-top', 0);
      }


      // if we're collapsing or sticking the header...
      if (settings.collapseHeader || settings.stickHeader) {
        var $body = $('body');
        if (settings.collapseHeader) {
          var collapsed = $body.hasClass('collapsed');
          var collapsePoint = (contentOffset * 0.6);
        } else if (settings.stickHeader) {
          // we're not setting a collapsing header,
          // but it will be sticky.
          stickHeader();
        }
      }

      // Build sticky elements
      $stickyElements.each(function() {
        var $thisParent = $(this).parent();
        $thisParent.css('position','relative');
        this.sticky = {
          'stickyHeight': $(this).outerHeight(true),
          'breakPoint': $(this).outerWidth(true) + $(settings.contentID).outerWidth(true),
          'topMargin': parseInt($(this).css('margin-top'), 10),
          'topOffset': $(this).offset().top, // measured from window top...
          'topPos': $(this).position().top,  // measured from parent.
          'parent': $thisParent
        };
      });

      function checkForChanges() {
        winPos = $win.scrollTop();
        if (settings.collapseHeader) {
          if (winPos > collapsePoint && collapsed === false) {
            collapseHeader();
          }
          if (winPos < collapsePoint && collapsed === true) {
            unCollapseHeader();
          }
        }
        $stickyElements.each(function() {
          if (this.sticky.topOffset - headerHeight - 30 < winPos && $win.width() >= this.sticky.breakPoint) {
            limits = calculateLimits(this);
            setFixedSidebar(this, winPos, limits);
          } else {
            setStaticSidebar(this);
          }
        });
      }



      // Listen for window scroll and check for changes.
      var $win = $(window);
      $win.bind({
        'scroll': checkForChanges,
        'resize': checkForChanges()
      });

      
      //  Calculates the limits top and bottom limits for the sidebar
      function calculateLimits(elem) {
        return {
          lowerLimit: (settings.footer.offset().top + elem.sticky.stickyHeight) + headerHeight,
          upperLimit: elem.sticky.topPos - headerHeight + 30 // offset in parent - header height
        };
      }
      // sets sidebar to a static positioned element
      function setStaticSidebar(elem) {
        $(elem).css({
          'position': 'static',
          'width': 'auto'
        });
      }
      // Sets sidebar to fixed position
      function setFixedSidebar(elem, winPos, limits) {
        if (limits.lowerLimit < winPos) {
          // avoid overlap with footer
          $(elem).css({
          top: limits.lowerLimit
          });
        } else { // normal fixed sidebar
          $(elem).css({
            position: 'fixed',
            top: limits.upperLimit,
            width: elem.sticky.parent.width()
          });
        }
      }
    }
  });
})(jQuery);
