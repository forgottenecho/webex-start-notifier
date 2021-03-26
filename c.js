/*
Set these params
*/
var debug = false;
var notifyUrl = "https://stockscores.net/notify.php?open";
var sleepTime = 30000;

console.log("Webex meeting notifier is loading up...");
const dateObject = new Date()
console.log(dateObject.toLocaleString());

var begin = true;

// Called when meeting starts
function notify(){
	var url_string = notifyUrl;

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

// Wrapped log() for debugging
function msg(output){
	if (debug){
		console.log(output);
	}
}

// main function, enters waiting room
function check() {
	// check for special time out case
	var dashJoin = document.getElementById("smartJoinButton-trigger");
	if (dashJoin != null){
		dashJoin.childNodes[0].childNodes[0].click();
	}

	var iframe = document.getElementById("pbui_iframe");
	if (iframe != null){
		// click through webex screens
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
			// Already in the room, wait for host to enter
			var btns = iframe.contentWindow.document.getElementsByTagName("button");
			msg(btns);
			var waiting = false;
			
			// look for notify host button
			for (var i=0;i<btns.length;i++) {
				msg(btns[i].innerHTML);
				if (btns[i].innerHTML == "Notify host"){
					waiting = true;
				}
			}
			
			// when is missing, assume meeting started
			if (!waiting){
				msg("Notify host button not there, assume meeting started.");
				return notify(); //stops loop and notifies
			} else {
				msg("Still waiting");
				console.log(".");
			}
		}
	} else { // iframe isn't present, look for join link
		var b1 = document.getElementById("push_download_join_by_browser");
		if (b1 != null){b1.click(); msg("join1");}
	}

	// call self after sleep
	msg("Sleeping for "+String(sleepTime))
	setTimeout(function(){ check(); }, sleepTime);
}

// check URL to see if timed out
var url = window.location.href.split("/");
msg(url);
if (url[url.length-1] == "dashboard") {
	msg("timed out. go back");
	window.history.back(); // rejoin meeting
}

// initiate check loop
check();