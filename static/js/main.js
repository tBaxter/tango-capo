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
********************************/
$('a.trigger').each(function(e){
	var hash = this.hash;
	// check for child selector
	if (hash.split(">").length > 1) {
		if (document.width > 1000 ){
			hash = hash.split(">")[0] + ' ' + hash.split(">")[1];
		} else {
			hash = hash.split(">")[0];
		}
	}
	$(hash).hide();
	$(this).click(function(e) {
		e.preventDefault();
		$(hash).toggle();
		$(this).toggleClass('activated');
	});
});

// function(s) for collapsing/uncollapsing header onscroll
// can also be used to create conditional 'sticky' header
var collapsed = true;
function getYOffset() {
    var pageY;
    if(typeof(window.pageYOffset)=='number') {
       pageY=window.pageYOffset;
    }
    else {
       pageY=document.documentElement.scrollTop;
    }
    return pageY;
}
$(window).scroll(function () {
	if (getYOffset() > 120 && collapsed === false) {
		collapsed = true;
		$('body').addClass('collapsed');
	}
	if (getYOffset() < 80 && collapsed === true) {
		collapsed = false;
		$('body').removeClass('collapsed');
	}
});