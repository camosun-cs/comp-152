(function() {
	"use strict";
	var inPage = document.querySelectorAll("a[href^='#']");
	for (var i=inPage.length-1; i>=0; i--) {
		inPage[i].href = window.location + inPage[i].getAttribute('href');
		inPage[i].target = "_self";
	}
})();
