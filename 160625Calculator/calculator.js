

$(document).ready(function() {
	var numberSoFar = '';
	var numberNow = '';
	var numberToPrintOnScreen = '';
	var $click = document.getElementsByClassName("click");
	var $digit = document.getElementsByClassName("digit");
	var $operator = document.getElementsByClassName("operator");
	var savedNumber = [];
	var savedOperator = [];


// Functions

	// operators
	function add(num1, num2) {
		var number = parseFloat(num1) + parseFloat(num2);
		return(number);
	}

	function mutiply(num1, num2) {
		return parseFloat(num1) * parseFloat(num2);
	}

	function divide(num1, num2) {
		var result = parseFloat(num1) / parseFloat(num2);
		if (result.toString().length > 15) {
			return result.toFixed(15);
		} else {
			return result;
		}
	}
	
	function subtract(num1, num2) {
		return parseFloat(num1) - parseFloat(num2);
	}



	// print out current numbers on calculator screen
	function numberUpdate() {
		numberToPrintOnScreen = numberSoFar + numberNow;
		if (numberToPrintOnScreen.length > 17) {
			alert("Please insert less than 17 digit")
			numberToPrintOnScreen = numberToPrintOnScreen.slice(0,15);
		}
		document.getElementById("input").innerHTML = numberToPrintOnScreen;
	}


	// if numberNow === '', when using backspace, reset numberNow from numberSoFar
	function newNumberNow() {
		var newNumberSoFar = '';
		for (var i = 0 ; i < savedOperator.length ; i++) {
			newNumberSoFar += savedNumber[i]+savedOperator[i];
		}
		numberNow = numberSoFar.slice(newNumberSoFar.length);
		numberSoFar = newNumberSoFar;
	}


	// reset savedOperator and savedNumber arrays each time calculator calculates.
	function arrayReset(i) {
		if (savedOperator.length > 2) {
			for (var j = i; j < savedOperator.length; j++) {
				savedNumber[j+1] = savedNumber [j+2];
				savedOperator[j] = savedOperator[j+1];
			}
			savedNumber.pop();
			savedOperator.pop();
		} else if (savedOperator.length === 2) {
			if (i===0) {	
				savedNumber[1] = savedNumber[2];
				savedNumber.pop();
				savedOperator[0] = savedOperator[1];
				savedOperator.pop();
			} else if (i===1) {
				savedNumber.pop();
				savedOperator.pop();
			}
		} else {
		savedNumber.pop();
		savedOperator.pop();		
		}
		i=0;
	}

	function allReset() {
		savedNumber = [];
		savedOperator = [];
		numberSoFar = '';
		newNumberSoFar = '';
	}




	numberUpdate()

	/* Click numbers - push numbers to numberNow*/
	$('.digit').click(function() {
		if (numberNow === '0') numberNow = '';
		if (numberNow === '-0') numberNow = '-';
		numberNow += this.textContent;
		if (numberNow == '00' || numberNow == '-00') numberNow = numberNow.slice(0,-1);
		numberUpdate()
	});

	/* Click dot '.' */
	$('.dot').click(function() {
		if (numberNow==='' || numberNow === '-') {
			numberNow += '0'
		}
		if (!numberNow.includes('.')) {
			numberNow += '.'
		} 
		numberUpdate()
	});

	/* Click operator */
	$('.operator').click(function() {
		var thisOperator = this.textContent
		// when you click '+/-' button
		if(this.id.includes('minus')) {
			if (numberNow.includes('-')){
				numberNow = numberNow.slice(1);
			} else {
				if (numberNow === '') {
					numberNow = '-0';
				} else {
					numberNow = '-' + numberNow;
				}
			}
		// push numberNow to savedNumber Array, and reset numberNow to ''	
		} else if ((numberNow !== '0') && (numberNow.slice(-1) !== '.') && (numberNow !== '')) {
			savedNumber.push(numberNow);
			savedOperator.push(thisOperator);
			numberSoFar = numberSoFar + numberNow + thisOperator;
			numberNow = ''	
		// if numberNow is '', change the last savedOperator
		} else if (numberNow === '' && savedNumber.length !== 0) {
			savedOperator.pop();
			savedOperator.push(thisOperator);
			numberSoFar = numberSoFar.slice(0,-1) + thisOperator;
		}
		numberUpdate()
	});

	/* Click backspace */
	$('#backspace').click(function() {
		if (numberNow == '') {
			// if last character of numberSoFar is operator
			if (isNaN(numberSoFar.slice(-1))) {
				savedOperator.pop();
				numberSoFar = numberSoFar.slice(0, numberSoFar.length -1);
			// if last character of numberSoFar is number
			} else {
				savedNumber.pop();
				numberSoFar = numberSoFar.slice(0, numberSoFar.length -1);
				newNumberNow();
			}
		} else {
			numberNow = numberNow.slice(0, numberNow.length -1);
		}
		if (numberNow === '-') numberNow = '';
		numberUpdate()
	})

	/* Click clear */
	$('#clear').click(function() {
		allReset();	
		numberNow = '';	
		numberUpdate();		
	})

	$('#equal').click(function() {
		if (numberNow !== '') {
			savedNumber.push(numberNow);
			while (savedOperator.length !== 0) {
				for (var i = 0 ; i < savedOperator.length; i++) {
					if (savedOperator.includes('*') || savedOperator.includes('/')) {
						if (savedOperator[i]==='*') {
							savedNumber[i] = mutiply(savedNumber[i], savedNumber[i+1]);
							arrayReset(i);
						} else if (savedOperator[i] === '/') {
							if (+savedNumber[i+1] == 0) {
								numberNow = '0';
								allReset();
								numberUpdate();
								break;
							}
							savedNumber[i] = divide(savedNumber[i], savedNumber[i+1]);								
							arrayReset(i);
						}
					} else {
						if (savedOperator[i]==='+') {
							savedNumber[i] = add(savedNumber[i], savedNumber[i+1]);
							arrayReset(i);
						} else if (savedOperator[i] === '-') {
							savedNumber[i] = subtract(savedNumber[i], savedNumber[i+1]);
							arrayReset(i);
						}
					}										
				}
			}
		numberNow = savedNumber[0].toString();
		allReset();
		numberUpdate();				
		}
	});
})
