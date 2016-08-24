$(function(){
    // randomize puzzle piece order
    $(".puzzle > .sort-area > dl")
        .sort(function() { return Math.random()-.5; })
        .detach()
        .appendTo(".puzzle > .sort-area");

    // enable drag & drop
    $('.sort-main, .sort-inline').sortable({
        connectWith: ".sort-area"
    });

    // toggle completed code display
    $('#puzzle-toggle').click(function(){
    	$('.puzzle').toggleClass('raw');
    	if ($(this).is(':checked')) {
    		$('.sort-main, .sort-inline').sortable('disable');
            // add indenting
            $('.puzzle code, .puzzle .codeonly').each(function() {
                var $this = $(this);
                var depth = $this.parents(".ui-sortable-handle, .puzzle").length - 1;
                if (depth > 0) {
                    var tabs = "", i;
                    for (i=0; i<depth; i++) {
                        tabs += "\t";
                    }
                    $this.prepend(tabs);
                }
            });
    	} else {
    		$('.sort-main, .sort-inline').sortable('enable');
            // remove indenting
            $('.puzzle code, .puzzle .codeonly').each(function() {
                var txt = $(this).contents().get(0);
                if (txt.nodeType === Node.TEXT_NODE) {
                    txt.nodeValue = txt.nodeValue.replace(/\t*/, '');
                }
            });
    	}
    });
});