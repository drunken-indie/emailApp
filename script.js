
function getMails(id){
	var username;
	if (id=="inbox"){
		document.getElementById('emailDisplayTable').innerHTML = "INBOX EMAILS";
		username = document.getElementById('username').innerHTML;
		practice(username);
	}
	else if (id=="important"){
		document.getElementById('emailDisplayTable').innerHTML = "IMPORTANT EMAILS";
	}
	else if (id=="outbox"){
		document.getElementById('emailDisplayTable').innerHTML = "OUTBOX EMAILS";
	}
	else if (id=="spam"){
		document.getElementById('emailDisplayTable').innerHTML = "SPAM EMAILS";
	}
	else if (id=="junk"){
		document.getElementById('emailDisplayTable').innerHTML = "JUNK EMAILS";
	}
	else{
		document.getElementById('emailDisplayTable').innerHTML = "Nothing";
	}
	
}

//0 - search
function practice(username){
	//search_from 0 = Amazon, 1 = Ebay, 2 = Walmart
	var search_key;
	var search_from;
	var string_to_send;
	var recieved_data;
	

	

	string_to_send="aaasda"+username;
	/*
	var text = search_key+","+search_from;
	var bad = "EVAL" + JSON.stringify(text)+" 0\r\n";
	var x = new XMLHttpRequest();
	x.open("POST", "http://localhost:8000");
	x.send(bad);
	window.alert(x.responseText);
*/
	socket = new WebSocket('ws://127.0.0.1:8080');
	socket.onopen= function() {
		//window.alert(string_to_send)
    	socket.send(string_to_send);
	};
	socket.onmessage= function(s) {
    	//window.alert('got reply '+s.data);
    	//document.getElementById('table').innerHTML = JSON.stringify(s.data);
    	//recieved_data=s.data;
    	
    	
    	
    	recieved_data=s.data;
    	window.alert(recieved_data);

    	socket.close();
    	
	};


	
	
}