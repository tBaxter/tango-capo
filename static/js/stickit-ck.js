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

* Relies on getYOffset from main.js.
if not in place, add this:

// Reliably get window position.
function getYOffset() {
  var pageY;
  if(typeof(window.pageYOffset) === 'number') {
     pageY=window.pageYOffset;
  }
  else {
     pageY=document.documentElement.scrollTop;
  }
  return pageY;
}

**************************************************///(function($) {
$.fn.extend({stickit:function(e){function m(e){p=f.outerHeight();if(n.stickHeader){f.css("position","fixed");e==="collapse"?v=Math.min(d,p):v=Math.max(d,p);a.css("margin-top",v)}}function g(){a.addClass("collapsed");b=!0;m("collapse")}function y(){a.removeClass("collapsed");b=!1;m("uncollapse")}function w(){s=getYOffset();if(n.collapseHeader&&!n.user_collapse_pref){b===!1&&s>d/3&&g();b===!0&&s<d/8&&y()}(s===0||s>v)&&t.each(function(){if(s>this.sticky.topOffset&&u.width()>=980){o=E(this);x(this,s,o)}else S(this)})}function E(e){return{lowerLimit:l.position().top-l.outerHeight(!0)-(p+20),upperLimit:v}}function S(e){f.addClass("stickit-disabled");$(e).css({position:"static",width:"auto"})}function x(e,t,n){n.lowerLimit<t+p?$(e).css({top:-t+n.lowerLimit}):$(e).css({position:"fixed",top:n.upperLimit,width:e.sticky.parent.width()})}var t=$(this);if(!t)return;var n=$.extend({stickHeader:!0,collapseHeader:!0,header:"#masthead",footer:"#footer",content:"#content-main",user_collapse_pref:collapse_header},e),r=[];for(var i in n)n[i]||r.push(n[i]);if(r.length){console.warn(r);return!1}var s,o,u=$(window),a=$("body"),f=$(n.header),l=$(n.footer),c=$(n.content),h=f.next(),p=f.outerHeight(),d=Math.max(h.offset().top,p),v=0;if(n.collapseHeader){var b=a.hasClass("collapsed");b&&a.css("margin-top",d);n.user_collapse_pref&&g();$("#masthead #menu-trigger").on("click",function(e){console.log("clicked menu trigger");e.preventDefault();if(b===!0){y();window.scrollTo(0,0)}else{console.log("should collapse");g()}})}t.each(function(){var e=$(this).parent();e.css("position","relative");this.sticky={stickyHeight:$(this).outerHeight(!0),breakPoint:$(this).outerWidth(!0)+c.outerWidth(!0),topOffset:$(this).offset().top,topPos:$(this).position().top,parent:e}});u.bind({scroll:w,resize:w})}});