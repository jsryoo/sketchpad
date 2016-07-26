$(document).ready(function() {

/* add divs, class (container, square, firstCol, lastLow)*/
	$('body').append("<div></div>");
	$('body>div').addClass('container').height(161).width(161).css({"padding":"0","margin":"0 auto", "font-size":"0"});
	for (var i=0; i < 100; i++) {
		$('.container').append('<div class="square"></div>');
	}
	$('.container>.square').each(function(index) {
		index += 1;
		if (index % 10===1) {
			$(this).addClass('firstCol');
		} 
	});
	$('.container>.square').each(function(index) {
		index += 1;
		if (index > 90) {
			$(this).addClass('lastLow');
		}
	});
	$('.square').outerHeight(15).outerWidth(15).css({"border-top":"1px solid black", "border-right":"1px solid black", "display":"inline-block"});
	$('.firstCol').css({"border-left":"1px solid black"});
	$('.lastLow').css({"border-bottom":"1px solid black"});

	/* hover effect */
	$('.square').on('mouseenter',function() {
		$(this).addClass('trail');
		$('.trail').css({"background-color":"#666"});

	})
});
