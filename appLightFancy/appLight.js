var state = false;
$("#onOff").click(function(){
	if (!state){
		$("body").attr("style","background-color:black;");
		$("#onOff").attr("style","background-color:green;");
		$("#onOff").html("<p>On</p>");
		$("#onOff").animate({left: '100px'});
		
		state = true;
	} else {
		$("body").attr("style","background-color:white;");
		$("#onOff").attr("style","background-color:red;");
		$("#onOff").html("<p>Off</p>");
		$("#onOff").animate({left: '100px'});
		state = false;
	}
});