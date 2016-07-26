$(document).ready(function() {


	var divNum=35;
	var divLeng=16;
	var contSize=divNum*divLeng;

	/* buttons */
	$("<div></div>").appendTo('body').addClass('top')
		.css({"height":"70px","width":contSize, "margin":"10px auto", "font-size":"0","display":"block"});

	$("<div>Etch-A-Sketch</div>").appendTo('.top').addClass('Title')
		.css({"float":"left","margin":"10px 0","padding":"10px","font-size":"32px", "font-weight":"bold", "color":"#666","font-family":"ariel, sans-serif"});


	/* Clear button */
	$("<button>Clear</button>").appendTo('.top').addClass('clear')
		.css({"float":"right"});

	/* Random color button */
	$("<button>Random Color</button>").appendTo('.top').addClass('randomColor')
		.css({"float":"right"});

	/* Opacity button */
	$("<button>Opacity</button>").appendTo('.top').addClass('opacity')
		.css({"float":"right"});

	/* buttons CSS*/
	$('button').css({"margin":"13px 3px","padding":"10px","font-size":"16px", "background-color":"#ff5900", "border":"1px solid #ff5900","border-radius":"3px", "font-weight":"bold", "color":"#fff"});



	$("<div></div>").appendTo('body').addClass('container').height(contSize).width(contSize)
		.css({"margin":"0px auto", "font-size":"0","font-family":"ariel, sans-serif"});
	for (var i=0; i < divNum*divNum; i++) {
		$("<div></div>").appendTo('.container').addClass('square');
	}
	$('.square').height(divLeng-2).width(divLeng-2)
		.css({"border":"1px solid black", "display":"inline-block", "background-color":"#fff"});
	
	/* hover effect */
	$('.square').on('mouseenter',function() {
		$(this).addClass('trail');
		$('.trail').css({"background-color":"#555"});

	})

	



	/* Button click function */
	$('.clear').click(function() {
		divNum=prompt("How many squares per side do you want?","35");
		$('.container>div').remove();
		divLeng=560/divNum;
		contSize=divNum*divLeng;

		for (var i=0; i < divNum*divNum; i++) {
			$("<div></div>").appendTo('.container').addClass('square');
		}
		$('.square').height(divLeng-2).width(divLeng-2)
			.css({"border":"1px solid black", "display":"inline-block", "background-color":"#fff"});
		
		/* hover effect */
		$('.square').on('mouseenter',function() {
			$(this).addClass('trail');
			$('.trail').css({"background-color":"#555"});

		})
	});



	/* random color */
	$('.randomColor').click(function() {
		divNum=prompt("How many squares per side do you want?","35");
		$('.container>div').remove();
		divLeng=560/divNum;
		contSize=divNum*divLeng;

		for (var i=0; i < divNum*divNum; i++) {
			$("<div></div>").appendTo('.container').addClass('square');
		}
		$('.square').height(divLeng-2).width(divLeng-2)
			.css({"border":"1px solid black", "display":"inline-block", "background-color":"#fff"});
		
		/* hover effect */
		function getRandomColor() {
			var letters = '0123456789abcdef'.split('');
			var color='';
			for (var j=0;j<6;j++) {
				color += letters[Math.floor(Math.random()*16)];
			}
			return color;
		}

		$('.square').on('mouseenter',function() {
			$(this).css("background-color", '#'+getRandomColor());
		})
	});

	/* Opacity */
	$('.opacity').click(function() {
		divNum=prompt("How many squares per side do you want?","35");
		$('.container>div').remove();
		divLeng=560/divNum;
		contSize=divNum*divLeng;

		for (var i=0; i < divNum*divNum; i++) {
			var $hue=0;
			$("<div></div>").appendTo('.container').addClass('square').data('hue',$hue);
		}
		$('.square').height(divLeng-2).width(divLeng-2)
			.css({"border":"1px solid black", "display":"inline-block", "background-color":"#fff"});
		
		/* hover effect */
		$('.square').on('mouseenter',function() {
			$hue = $(this).data('hue')
			$hue = $hue +0.1;
			$(this).data('hue',$hue).css({"background-color":"#000", "opacity":$hue});
	})
	});

});