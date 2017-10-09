var started = false;
var num;
var tries = 0;
$("document").ready(function(){
	$("#game").hide();
});
$("#gen").click(function(){
	num = Math.floor((Math.random()*100) + 1);
	if (!started){
		$("#game").show(100);
		$("#guessArea").show(100);
		started = true;
	} else {
		tries = 0;
		$(".result").hide();
		$("#guessArea").show(100);
	}
	$("#numGuesses").html(tries);
	//console.log(num); //Left in for debugging purposes

});

$("#custom").click(function(){
	
	num = Number($("#cNum").val());
	if (!started){
		$("#game").show(100);
		started = true;
	} else {
		tries = 0;
		$("#guessArea").show(100);
		$("#game").show(100)
		$(".result").hide();
	}
	//console.log(num);
	$("#numGuesses").html(tries);
	$("#cNum").val("")

});
$("#sub").click(function(){
	var guess = Number($("#guess").val());
	tries++;
	$("#numGuesses").html(tries);
	if (guess == "" || guess == null){
		$("#status").prepend("<br><br><span>Please insert a guess</span>");
	}
	console.log(guess);
	if (guess > num){
		console.log("high");
		$("#status").prepend('<br><br><span class="result">' + guess + ' is too high</span>');
	} else if (guess < num){
		$("#status").prepend('<br><br><span class="result">' + guess + ' is too low</span>');
	} else {
		$("#status").prepend('<br><br><span class="result"><strong>' + guess + ' is correct! You Win!</strong></span>');
		$("#guessArea").hide();
	}
});