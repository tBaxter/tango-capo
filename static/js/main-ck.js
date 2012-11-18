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
********************************/function getYOffset(){var e;typeof window.pageYOffset=="number"?e=window.pageYOffset:e=document.documentElement.scrollTop;return e}function tabit(){$(".tabs").each(function(){var e=$(this),t="";e.addClass("tabbed");e.sections=$(this).find("> *").not("ul");e.nav=e.find("> ul");var n=e.nav.height();if(e.nav.length===0){e.nav=$(".remote_tabs_nav");n=0}if(!e.nav){console.log("could not find tab nav!");return}e.navitems=e.nav.find("li");if(window.location.hash){t=window.location.hash.replace("-view","");if(e.nav){e.navitems.removeClass("active");e.nav.find("a[href="+t+"]").parent().addClass("active")}}else{t=e.nav.find("li.active a").hash;t||(t=e.navitems.eq(0).addClass("active").find("a").get(0).hash)}$(t).addClass("activeTab");e.nav.find("a").click(function(t){t.preventDefault();var r=this.hash,i=$(r).parent().find("> *").not("ul");window.location.hash=r+"-view";parent=$(this).parent();parent.addClass("active");var s=parent.parent().find("li");$(s).not(parent).removeClass("active");$(r).addClass("activeTab");e.css("min-height",$(r).height()+n+"px");i.not(r).removeClass("activeTab")})})}$("a.trigger").each(function(){var e=this.hash;e.split(">").length>1&&(document.width>1e3?e=e.split(">")[0]+" "+e.split(">")[1]:e=e.split(">")[0]);$(e).hide();$(this).click(function(t){t.preventDefault();$(e).toggle();$(this).toggleClass("activated")})});var collapsed=!0;$(window).scroll(function(){if(getYOffset()>120&&collapsed===!1){collapsed=!0;$("body").addClass("collapsed")}if(getYOffset()<80&&collapsed===!0){collapsed=!1;$("body").removeClass("collapsed")}});tabit();