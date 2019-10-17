var listOfMailboxes=["inbox","important","outbox","spam","junk"];
var currentID;
function getMails(id){
	currentID = id;
	listOfMailboxes.forEach(removeClass);
	document.getElementById(id).classList.add("active");
	//listOfMailboxes.forEach(printClass);

	var username;
	username = document.getElementById('username').innerHTML;
	changeView(id);
	getDataFromDB(username, id);
}


function moveEmail(){
	var i;
	var checkbox;
	var username = document.getElementById('username').innerHTML;
	var selected="";
	var totalNumber = (document.querySelectorAll('input[type="checkbox"]').length);
	for (i=0;i<totalNumber;i++){
		checkbox=("checkbox".concat(i.toString()))
		if (document.getElementById(checkbox).checked){
			selected=selected.concat(i.toString().concat(" "));
			//window.alert("YAY");
		}
		else{
			//window.alert("NAH");
		}
	}
	var e = document.getElementById("dropdownMenu");
	var strUser = e.options[e.selectedIndex].value;
	if (!selected.length==0){
		sendRequest(selected, username, strUser);
	}
	//window.alert(selected);

	
}

function sendRequest(selected, username, id){
	var string_to_send;
	var recieved_data;
	

	

	string_to_send="POST "+username+" "+id+" "+currentID+" "+selected;

	socket = new WebSocket('ws://127.0.0.1:8080');
	socket.onopen= function() {
    	socket.send(string_to_send);
	};
	socket.onmessage= function(s) {
    	
    	recieved_data=s.data;
    	document.getElementById('emailDisplayTable').innerHTML=recieved_data;

    	socket.close();
    	
	};
}

function changeView(id){
	if (id=="inbox"){
		document.getElementById('currentDir').innerHTML = "INBOX EMAILS";
		document.getElementById('dropdownMenu').innerHTML = "<option value=\"important\">mark as important</option><option value=\"spam\">move to spam</option><option value=\"junk\">move to junk</option>";
	}
	else if (id=="important"){
		document.getElementById('currentDir').innerHTML = "IMPORTANT EMAILS";
		document.getElementById('dropdownMenu').innerHTML = "<option value=\"inbox\">unmark as important</option><option value=\"spam\">move to spam</option><option value=\"junk\">move to junk</option>";
	}
	else if (id=="outbox"){
		document.getElementById('currentDir').innerHTML = "OUTBOX EMAILS";
		document.getElementById('dropdownMenu').innerHTML = "<option value=\"junk\">move to junk</option>";
	}
	else if (id=="spam"){
		document.getElementById('currentDir').innerHTML = "SPAM EMAILS";
		document.getElementById('dropdownMenu').innerHTML = "<option value=\"inbox\">move to inbox</option><option value=\"junk\">move to junk</option>";
	}
	else if (id=="junk"){
		document.getElementById('currentDir').innerHTML = "JUNK EMAILS";
		document.getElementById('dropdownMenu').innerHTML = "<option value=\"inbox\">move to inbox</option><option value=\"spam\">move to spam</option>";
	}	
	else{
		document.getElementById('currentDir').innerHTML = "Nothing";
	}
}
function removeClass(id){
	document.getElementById(id).classList.remove("active");
}

function printClass(id){
	if (document.getElementById(id).classList.contains("active")){
		return id;
	}
			
}

//0 - getDataFromDB
function getDataFromDB(username, id){
	var string_to_send;
	var recieved_data;
	

	

	string_to_send="GET "+username+" "+id;

	socket = new WebSocket('ws://127.0.0.1:8080');
	socket.onopen= function() {
    	socket.send(string_to_send);
	};
	socket.onmessage= function(s) {
    	
    	recieved_data=s.data;
    	document.getElementById('emailDisplayTable').innerHTML=recieved_data;

    	socket.close();
    	
	};


	
	
}