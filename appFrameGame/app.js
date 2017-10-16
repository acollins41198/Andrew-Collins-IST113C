"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
	};
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	var number;
	var guess;
	var tries = 0;
	window.app = new MyApp();
	window.app.start();
	
	$("#submitNumber").click(function(){
		$("#beginGame").addClass("hidden");
		$("#playingGame").removeClass("hidden");
		number = Number("$("#userNumber").val()");
	});
	
	$("#submitGuess").click(function(){
		guess = Number($("#userGuess").val());
		tries++;
		$("#tries").html("Tries: " + tries);
		if (guess > number){
			$("#log").prepend("<p>" + guess + " is too high.</p>");
		} else if (guess < number){
			$("#log").prepend("<p>" + guess + " is too low.</p>");
		} else if (guess == number){
			$("#log").prepend("<p><strong>" + guess + " is correct!</strong></p>");
			$("#submitGuess").addClass("hidden");
			$("#restartButton").removeClass("hidden");
		}
	});
	
	$("#restartButton").click(function(){
		number = 0;
		tries = 0;
		$("#tries").html("Tries: " + tries);
		$("#submitGuess").removeClass("hidden");
		$("#restartButton").addClass("hidden");
		$("#beginGame").removeClass("hidden");
		$("#playingGame").addClass("hidden");
		$("#log").empty();
	});
});


