$(document).ready(function() {
	console.log('loaded');	
	var ref;
	ref = new Firebase('https://ecampus.firebaseio.com/');
	console.log('connected');
	authData = ref.getAuth();
	if(authData){
		userID = authData.password.email;
		$("#heading").html("Logged In as "+userID);
	}


  $('#logout').bind('click touchstart',function(e){
	if(authData){
		ref.unauth();
		window.location.href="index.html";
	}
  });
});