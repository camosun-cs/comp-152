/**
 * Reposition floating elements above their previous sibling.
 * Allows us to keep them below in source order where they make more sense
 * in reading order, but align the tops nicely when floated
 */
(function() {
	'use strict';

	var BREAKPOINT = "(min-width: 400px)";
	var AFFECTS = "aside, .right, li > figure";

	// Element.matches polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = (
			Element.prototype.matchesSelector || 
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector || 
			Element.prototype.oMatchesSelector || 
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = document.querySelectorAll(s);
				var	i = matches.length;
				while (--i >= 0 && matches.item(i) !== this);
				return i > -1;
			}
		);
	}

	// adjust ordering at CSS breakpoint
	var toReorder = [];
	enquire.register(BREAKPOINT, {
		setup: function () {
			var nodes = document.querySelectorAll(AFFECTS);
			for (var i=0; i<nodes.length; i++) {
				if (
					nodes[i].previousElementSibling !== null &&
					! nodes[i].previousElementSibling.matches(AFFECTS)
				) {
					toReorder.push(nodes[i]);
				}
			}
		},
		deferSetup: true,
		match: function () {
			toReorder.forEach(function(float) {
				if (!float.dataset.reordered) {
					float.parentNode.insertBefore(
						float,
						float.previousElementSibling
					);
					float.dataset.reordered = "true";
				}
			});
		},
		unmatch: function() {
			toReorder.forEach(function(float) {
				if (float.dataset.reordered) {
					float.parentNode.insertBefore(
						float,
						float.nextSibling.nextSibling
					);
					float.dataset.reordered = "";
				}
			});
		}
	});
})();
