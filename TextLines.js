

// TextLines.js
/**============================================================================

NOTES:
Author: Joey Grable
Date: 12/15/2017
Function: practice

/**============================================================================**/



// safe code, do not alter the global object
// create a new execussion context
(function(global) {

	// set up memory space (not accessible by global object)
	// variables accessible by TextLines, TL$() object
	var textarea = {};
	var linesArray = [];
	var minWords = 0;
	var maxWords = 0;
	var minChars = 0;
	var maxChars = 0;
	// error log
	var logMessages = {
		log: 'LOG',
		success: 'SUCCESS',
		warn: 'WARNING',
		error: 'ERROR',
		fail: 'FAILURE',
		fix: 'FIX',
		patch: 'PATCH',
	};


/**
 * 
 * TextLines
 * 
 */

	// set up TextLines function constructor to handle the textarea input data
	var TextLines = function(textareaData) {
		// return a new TextLines object that initializes the passed data
		return new TextLines.init(textareaData);
	}

	// TextLines methods used by the framework
	// prototype of TextLines object
	TextLines.prototype = {

		// log to console function
		log: function(msg, type) {
			// initial vars
			var msg = msg || '';
			var type = type || 'log';
			if (console) {
				console.log(logMessages[type] + ': ' + msg);
			}
			// make this method chainable
			return this;
		},

		// textareaToLinesArray
		// - takes textarea and converts each line into an individual Line object
		// - and appends the new Line object to the linesArray
		textareaToLinesArray: function(arr, textarea) {
			// split individual lines
			var lines = textarea.split("\n");
			// loop lines array
			for (i = 0; i < lines.length; i++) {
				// construct new line object
				var currentLine = [];
				currentLine['string'] = lines[i] || '';
				currentLine['charCount'] = lines[i].length || 0;
				currentLine['wordCount'] = lines[i].split(' ').length || 0;
				arr.push(currentLine);
			}
			// return an array with all the lines separated on different indexes
			return arr;

		},

		// analyzeMinMax
		// - loop through each line of the array
		// - determine min or max, word count or character count
		analyzeMinMax: function(arr) {
			// initial vars
			// min|max words
			var maxWordCountVal = new Number;
			var minWordCountVal = new Number;
			// min|max characters
			var maxCharCountVal = new Number;
			var minCharCountVal = new Number;
			// loop through array items
			for(i = 0; i < arr.length; i++) {
				// current array item vars
				var currentIndex = i;
				var currentWordCount = arr[i]['wordCount'];
				var currentCharCount = arr[i]['charCount'];

				// WORD COUNT
				// max word count
				if (currentWordCount > maxWordCountVal) {
					// update vars
					maxWordCountVal = currentWordCount;
				// min word count
				} else if (minWordCountVal == 0 || currentWordCount < minWordCountVal) {
					// update vars
					minWordCountVal = currentWordCount;
				} // endif
				// CHARACTER COUNT
				// max character count
				if (currentCharCount > maxCharCountVal) {
					// update vars
					maxCharCountVal = currentCharCount;
				// min character count
				} else if (minCharCountVal == 0 || currentCharCount < minCharCountVal) {
					// update vars
					minCharCountVal = currentCharCount;
				} // endif
			} // end loop
			// set the object vars
			this.minWords = minWordCountVal;
			this.maxWords = maxWordCountVal;
			this.minChars = minCharCountVal;
			this.maxChars = maxCharCountVal;
			// make this method chainable
			return this;
		}, // end calcMinMaxWords f()

		setMinMaxLines: function(arr) {
			// initial vars
			// log
			console.log('hello world');
			// loop through array items
			for(i = 0; i < arr.length; i++) {
				// initial vars
				var currentWordCount = arr[i]['wordCount'];
				var currentCharCount = arr[i]['charCount'];
				// WORD COUNT
				// max word count
				if (currentWordCount === this.maxWords) {
					// update vars
					this.linesArray[i]['isMinWordCount'] = false;
					this.linesArray[i]['isMaxWordCount'] = true;
				} else if (currentWordCount === this.minWords) {
					this.linesArray[i]['isMinWordCount'] = true;
					this.linesArray[i]['isMaxWordCount'] = false;
				} else {
					this.linesArray[i]['isMinWordCount'] = false;
					this.linesArray[i]['isMaxWordCount'] = false;
				}// end if
				// CHARACTER COUNT
				// max character count
				if (currentCharCount === this.maxChars) {
					// update vars
					this.linesArray[i]['isMinCharCount'] = false;
					this.linesArray[i]['isMaxCharCount'] = true;
				} else if (currentCharCount === this.minChars) {
					this.linesArray[i]['isMinCharCount'] = true;
					this.linesArray[i]['isMaxCharCount'] = false;
				} else {
					this.linesArray[i]['isMinCharCount'] = false;
					this.linesArray[i]['isMaxCharCount'] = false;
				}// end if
			} // end loop
			// make this method chainable
			return this;
		}, // end setMinMaxLines f()

	}; // end prototype methods

	// TextLines object initialization function, with one input var
	TextLines.init = function(textData) {
		// save 'this' var to self
		var self = this;
		// set default variables (properties)
		// validate the initial object
		self.linesArray = self.textareaToLinesArray(linesArray, textData);
		// analyze words and characters | using chainable methods
		self.analyzeMinMax(self.linesArray).setMinMaxLines(self.linesArray);
	};

	// Initialize the TextLines object methods
	// any objects created with this function
	// - should point here for its 'prototype chain'
	// - has access to methods in TextLines.prototype memory space
	TextLines.init.prototype = TextLines.prototype;

	// create "TL$" alias in the global object
	// used as shorthand for the TextLines object
	global.TextLines = global.TL$ = TextLines;


// auto execute code, passing it the global var
}(window));


