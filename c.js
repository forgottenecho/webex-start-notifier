var debug = false;

console.log("Webex meeting notifier is loading up...");
const dateObject = new Date()
console.log(dateObject.toLocaleString());

var begin = true;

function notify(){
	var url_string = "https://stockscores.net/notify.php?open"

	function makeHttpObject() {
	  try {return new XMLHttpRequest();}
	  catch (error) {}
	  try {return new ActiveXObject("Msxml2.XMLHTTP");}
	  catch (error) {}
	  try {return new ActiveXObject("Microsoft.XMLHTTP");}
	  catch (error) {}

	  throw new Error("Could not create HTTP request object.");
	}
	var request = makeHttpObject();
	request.open("GET", url_string);
	request.send(null);
	request.onreadystatechange = function() {
	  if (request.readyState == 4)
		console.log(request.responseText);
	};
	alert("Open");
}


function msg(output){
	if (debug){
		console.log(output);
	}
}
function check() {
	var dashJoin = document.getElementById("smartJoinButton-trigger");
	if (dashJoin != null){
		dashJoin.childNodes[0].childNodes[0].click();
	}
	var iframe = document.getElementById("pbui_iframe");
	if (iframe != null){
		if (begin) {
			var nextBtn = iframe.contentWindow.document.getElementById("guest_next-btn");
			if (nextBtn != null) {nextBtn.click();}
			var b2 = iframe.contentWindow.document.getElementById("interstitial_join_btn");
			msg(b2);
			if (b2 != null){
				msg("Found join btn, clicking");
				b2.click();
				begin = false;
			} else {
				msg("No join btn");
			}
		
		} else {
			var btns = iframe.contentWindow.document.getElementsByTagName("button");
			msg(btns);
			var waiting = false;
			for (var i=0;i<btns.length;i++) {
				msg(btns[i].innerHTML);
				if (btns[i].innerHTML == "Notify host"){
					waiting = true;
				}
			}
			if (!waiting){
				msg("Notify host button not there, assume meeting started.");
				return notify(); //stops loop and notifies
			} else {
				msg("Still waiting");
				console.log(".");
			}
		}
	} else {
		var b1 = document.getElementById("push_download_join_by_browser");
		if (b1 != null){b1.click(); msg("join1");}
	}
	sleepTime=30000;
	msg("Sleeping for "+String(sleepTime))
	setTimeout(function(){ check(); }, sleepTime);
}

var url = window.location.href.split("/");
msg(url);
if (url[url.length-1] == "dashboard") {
	msg("timed out. go back");
	window.history.back();
}
check();