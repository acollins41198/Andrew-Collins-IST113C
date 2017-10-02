var onOff = document.getElementById("switch");
var state = false;
onOff.onclick = function(){
	if (state == false){
		onOff.style.backgroundColor = "green";
		onOff.style.marginLeft = '100px';
		onOff.innerHTML = "<p><strong>On</strong></p>";
		document.body.style.backgroundColor = "black";
		state = true;
	} else {
		onOff.style.backgroundColor = "red";
		onOff.innerHTML = "<p><strong>Off</strong></p>";
		onOff.style.marginLeft = '0px';
		document.body.style.backgroundColor = "white";
		state = false;
	}
}