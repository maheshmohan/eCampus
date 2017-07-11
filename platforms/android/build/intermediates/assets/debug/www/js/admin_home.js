$(document).ready(function() {
	$("#del_stud_div").hide();
	$("#del_fac_div").hide();
	$("#del_cant_div").hide();
	$("#del_hostel_div").hide();
	console.log('loaded');	
	//variables for firebase reference
	var ref,authData,studData,facData,cantData,hostData;
	//variables for delete options
	var key,id,selected_key;
	var fac_key,hostel_key,cant_key,fac_id,hostel_id,cant_id;
	var fac_selected_key,hostel_selected_key,cant_selected_key;
	ref = new Firebase('https://ecampus.firebaseio.com/');
	console.log('connected');
	authData = ref.getAuth();
	studData = ref.child('data/studentData');
	facData = ref.child('data/facultyData');
	cantData = ref.child('data/csData');
	hostData = ref.child('data/hsData');
	if(authData){
		userID = authData.password.email;
		$("#heading").html("Logged In as "+userID);
	}
	else{
		window.alert("Please login to continue!");
		window.location.href="index.html";
	}

	$("#del_stud").click(function(){
		$("#del_stud_div").toggleClass('overlay');
		$("#del_stud_div").toggle(100);
		studData.on("value",function(snap){
			$("#stud_sel").empty();
			$("#stud_sel").append('<option value="">Choose Roll Number</option>');
			snap.forEach(function(dat){
				key = dat.key();
				id = dat.val().stud_rollnum;
				$("#stud_sel").append('<option value="'+key+'">'+id+'</option>');
			});
		});
	});
	
	$('#stud_del').bind('click touchstart',function(e){
		selected_key = $("#stud_sel").val();
		console.log(selected_key);
		studData.child(selected_key).remove();
		window.alert("Record Removed");
	});
	
	//populate faculty IDs
	$("#del_fac").click(function(){
		$("#del_fac_div").toggleClass('overlay');
		$("#del_fac_div").toggle(100);
		facData.on("value",function(snap1){
			$("#fac_sel").empty();
			$("#fac_sel").append('<option value="">Choose ID</option>');
			snap1.forEach(function(dat1){
				fac_key = dat1.key();
				fac_id = dat1.val().fac_ID;
				$("#fac_sel").append('<option value="'+fac_key+'">'+fac_id+'</option>');
			});
		});
	});
	
	//delete faculty
	$('#fac_del').bind('click touchstart',function(e){
		fac_selected_key = $("#fac_sel").val();
		console.log(fac_selected_key);
		facData.child(fac_selected_key).remove();
		window.alert("Record Removed");
	});
	
	
	//populate canteen staff IDs
	$("#del_daily").click(function(){
		$("#del_daily_div").toggleClass('overlay');
		$("#del_daily_div").toggle(100);
		cantRef.child('price_list').on("value",function(snap2){
			$("#daily_sel").empty();
			$("#daily_sel").append('<option value="">Choose Item</option>');
			snap2.forEach(function(dat2){
				cant_key = dat2.key();
				cant_id = dat2.val().item;
				console.log(cant_id);
				$("#cant_sel").append('<option value="'+cant_key+'">'+cant_id+'</option>');
			});
		});
	});
	
	//delete canteen staff
	$('#daily_del').bind('click touchstart',function(e){
		cant_selected_key = $("#daily_sel").val();
		console.log(cant_selected_key);
		cantData.child(cant_selected_key).remove();
		window.alert("Record Removed");
	});
	
	//populate hostel staff IDs
	$("#del_hostel").click(function(){
		$("#del_hostel_div").toggleClass('overlay');
		$("#del_hostel_div").toggle(100);
		console.log("in hostel")
		hostData.on("value",function(snap3){
			$("#hostel_sel").empty();
			$("#hostel_sel").append('<option value="">Choose ID</option>');
			snap3.forEach(function(dat3){
				hostel_key = dat3.key();
				hostel_id = dat3.val().hst_ID;
				$("#hostel_sel").append('<option value="'+hostel_key+'">'+hostel_id+'</option>');
			});
		});
	});
	
	//delete hostel staff
	$('#hostel_del').bind('click touchstart',function(e){
		hostel_selected_key = $("#hostel_sel").val();
		console.log(hostel_selected_key);
		hostData.child(hostel_selected_key).remove();
		window.alert("Record Removed");
	});
	
	$('#logout').bind('click touchstart',function(e){
		if(authData){
			ref.unauth();
			window.location.href="index.html";
		}
	});
});