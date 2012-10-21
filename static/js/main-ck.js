/*************
// Simple trigger handling.
// Takes hash from trigger link and toggles the object.
// Example: <a href="#foo" class='trigger'>
// would automatically hide the #foo element, then toggle it onclick.
// Also allows child selectors:
//    <a href="#foo>ul" class="trigger">
//    <a href="#foo>.bar" class="trigger">
// Note that the child selector does not have to be a direct descendant.
// It will toggle any matching children of the main selector.
********************************/function getYOffset(){var e;typeof window.pageYOffset=="number"?e=window.pageYOffset:e=document.documentElement.scrollTop;return e}$("a.trigger").each(function(e){var t=this.hash;t.split(">").length>1&&(document.width>1e3?t=t.split(">")[0]+" "+t.split(">")[1]:t=t.split(">")[0]);$(t).hide();$(this).click(function(e){e.preventDefault();$(t).toggle();$(this).toggleClass("activated")})});var collapsed=!0;$(window).scroll(function(){if(getYOffset()>120&&collapsed===!1){collapsed=!0;$("body").addClass("collapsed")}if(getYOffset()<80&&collapsed===!0){collapsed=!1;$("body").removeClass("collapsed")}});