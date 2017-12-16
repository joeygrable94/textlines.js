// app.js
// (function(global, TL$) {

	document.getElementById('analyze-lines-post').addEventListener('click', function () {
		var textareaText = document.getElementById('textarea-text').value;
		// analyze data on submit
		var tl = TL$(textareaText);
		console.log(tl);
	});

//}(window, TL$()));



