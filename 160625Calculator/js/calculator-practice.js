// JavaScript calculator - without jQuery practice


/*
Warmup !

// takes an array and returns the maximum number.
function my_max(myArray) {
	var maxNumber = myArray[0]
	for (var i = 0 ; i < myArray.length ; i++) {
		if (maxNumber < myArray[i]) {
			var maxNumber = myArray[i];
		} 
	}
	return maxNumber;
}

// takes a string and returns the number of vowels
function vowel_count(inString) {
	var count = 0;
	var vowels = [a, e, i, o, u, y];
	var myString = inString.toLowerCase();
	for (var i = 0 ; i < myString.length ; i++) {
		for (var j = 0 ; j < vowels.length ; j++) {
			if (myString[i] === vowels[j]) {
				count++;
			}
		}
	}
	return count;
}

// takes a string and returns all the characters in the opposite position
// e.g. reverse("this is a string") => "gnirts a si siht"
function reverse(inString) {
    var reverseString = "";
	for (var i = 0; i < inString.length ; i++) {
		reverseString += inString[inString.length - 1 - i];
	}
    return reverseString;
}

*/


function add(num1, num2) {
	var number = parseFloat(num1) + parseFloat(num2);
	return(number);
}

function mutiply(num1, num2) {
	return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
	if (num2 === 0) {
		return 0;
	}
	return parseFloat(num1) / parseFloat(num2);
}

function subtract(num1, num2) {
	return parseFloat(num1) - parseFloat(num2);
}


var numberSoFar = '';
var newNumberSoFar = '';
var numberNow = '';
var totalNumber = '';
var $click = document.getElementsByClassName("click");
var $digit = document.getElementsByClassName("digit");
var $operator = document.getElementsByClassName("operator");
var savedNumber = [];
var savedOperator = [];


numberUpdate();




function hasClass(element, clazz) {
	return element.className.split(" ").indexOf(clazz) > -1;
}

function numberUpdate() {
	totalNumber = numberSoFar + numberNow;
	if (totalNumber.length > 17) {
		alert("Please insert less than 17 digit")
		totalNumber = totalNumber.substring(0,17);
	}
	document.getElementById("input").innerHTML = totalNumber;
}

function numberNowSetting() {
	for (var i = 0 ; i < savedOperator.length ; i++) {
		newNumberSoFar += savedNumber[i]+savedOperator[i];
	}
	numberNow = numberSoFar.substring(newNumberSoFar.length, numberSoFar.length);
	numberSoFar = newNumberSoFar;
	newNumberSoFar = '';
}

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

window.onload = function() {
	for (var i = 0 ; i < $click.length; i++ ) {
		$click[i].onclick = function () {
			if (this.className.includes("digit")) {
				var thisNumber = this.textContent;
				if (this.className.includes("dot")) {
					if (numberNow==='') {
						numberNow = '0'
					} else if (numberNow.includes('.')) {
						return numberNow;
					} 
				} else if (this.className.includes("zero")) {
					if (numberNow === '0') {
						return numberNow;
					} 
				}
				if (numberNow === '0') {
					if (this.className.includes("dot")) {
						numberNow += thisNumber;
					} else {
						numberNow = thisNumber;
					}
				} else {
					numberNow += thisNumber;
				}				
			} else if (this.className.includes("operator")) {
				var thisOperator = this.textContent;
				if ((numberNow !== '') && (numberNow.slice(-1) !== '.') && (parseFloat(numberNow) !== 0))  {
					if (this.id.includes("minus")) {
						if (numberNow.includes('-')){
							numberNow = numberNow.substring(1, numberNow.length);
						} else {
							numberNow = '-' + numberNow;
						}
					} else {
						savedNumber.push(numberNow);
						savedOperator.push(thisOperator);
						numberSoFar = numberSoFar + numberNow + thisOperator;
						numberNow = ''
					} 
				} else if ((numberNow === '') && (this.id.includes("minus"))) {
					numberNow = '-'
				} else {
					if(parseFloat(numberNow)!==0) {
						savedOperator.pop();
						savedOperator.push(thisOperator);
						numberSoFar = numberSoFar.substring(0,numberSoFar.length-1) + thisOperator;
					}
				}
			} else if (this.id.includes("backspace")) {
				if (numberNow != '') {
					numberNow = numberNow.substring(0, numberNow.length -1);
				} else {
					if(isNaN(numberSoFar.slice(-1))) {
						savedOperator.pop();
						numberSoFar = numberSoFar.substring(0, numberSoFar.length -1);
						numberNowSetting();
					} else {
						savedNumber.pop();
						numberSoFar = numberSoFar.substring(0, numberSoFar.length -1);
						numberNowSetting();
					}
				}
			} else if ((this.id.includes("equal")) && (numberNow!=='')) {
				savedNumber.push(numberNow);
				while (savedOperator.length !== 0) {
					for (var i = 0 ; i < savedOperator.length; i++) {
						if (savedOperator.includes('*', '/')) {
							if (savedOperator[i]==='*') {
								savedNumber[i] = mutiply(savedNumber[i], savedNumber[i+1]);
								arrayReset(i);
							} else if (savedOperator[i] === '/') {
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
			} else if (this.id.includes("clear")) {
				allReset();	
				numberNow = '';	
			} 
			numberUpdate();
		}
	}
}


