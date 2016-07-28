$(document).ready(function() {


	var divNum=20;
	var divLeng=35;
	var padSize=divNum * divLeng;

	/* Create buttons */
	$("<div></div>").appendTo('body').addClass('top').width(padSize*1.5);

	$("<div>Etch-A-Sketch</div>").appendTo('.top').addClass('title');

		/* Random color button */
	$("<button>Random Color</button>").appendTo('.top').addClass('randomColor');

	/* Opacity button */
	$("<button>Opacity</button>").appendTo('.top').addClass('opacity')

	/* Clear button */
	$("<button>Original Version</button>").appendTo('.top').addClass('clear');


	/* Create containers */
	var createContainers = function () {
		$('.container').remove();
		$("<div></div>").appendTo('body').addClass('container').height(padSize).width(padSize*1.5)
		for (var i=0; i < divNum*divNum*1.5; i++) {
			$("<div></div>").appendTo('.container').addClass('square');
		}
		$('.square').height(divLeng).width(divLeng)
	}
	createContainers();


	/* hover effect */
	var hoverEffect = function() {
		$('.square').on('mouseenter',function() {
		$(this).addClass('trail');
	})
	}
	hoverEffect();



	/* Button click functions */

	/* Clear Button */
	var calculateBoard = function() {
			var promptValue = prompt("How many lines do you want?(1~60)","20");
			divNum = +promptValue > 0 ? promptValue : divNum;
			divLeng = padSize / divNum;
			padSize = divNum * divLeng;
			createContainers();
		};


	$('.clear').click(function() {
		calculateBoard()
		hoverEffect();
	});



	/* Random Color Button */
	$('.randomColor').click(function() {
		calculateBoard();

		/* hover effect */
		var getRandomColor = function() {
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


	/* Opacity Button */
	$('.opacity').click(function() {
		calculateBoard();
		var $hue = 0;
		$('.square').data('hue',$hue)//.css({"background-color":"#FFF"});
		
		/* hover effect */
		$('.square').on('mouseenter',function() {
			$hue = $(this).data('hue')
			$hue = $hue +0.2;
			$(this).data('hue',$hue).css({"background-color":"#000", "opacity":$hue});
	})
	});
});