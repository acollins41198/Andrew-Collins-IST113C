var started = false;
var num;
$("document").ready(function(){
	$("#game").hide();
});
$("#gen").click(function(){
	num = Math.floor((Math.random()*100) + 1);
	if (!started){
		$("#game").show(100);
		var started = true;
	} else {
		$("#status").empty();
	}
	console.log(num);

});

$("#custom").click(function(){
	var num = Number($("#cNum").val());
	if (!started){
		$("#game").show(100);
		var started = true;
	} else {
		$("#status").empty();
	}
	console.log(num);

});
$("#sub").click(function(){
	var guess = Number($("#guess").val());
	if (guess == "" || guess == null){
		$("#status").prepend("<br><br><span>Please insert a guess</span>");
	}
	console.log(guess);
	if (guess > num){
		console.log("high");
		$("#status").prepend("<br><br><span>" + guess + " is too high</span>");
	} else if (guess < num){
		$("#status").prepend("<br><br><span>" + guess + " is too low</span>");
	} else {
		$("#status").prepend("<br><br><span>" + guess + " is correct! You Win!</span>");
	}
});