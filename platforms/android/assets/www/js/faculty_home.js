$(document).ready(function() {
	console.log('loaded');	
	$("#more_info").hide();
	$("#cant_time").hide();
	$("#spl-div").hide();
	$("#price-div").hide();
	
	var ref;
	ref1 = new Firebase('https://ecampus.firebaseio.com/');
	ref = ref1.child("data/facultyData");
	cantRef = ref1.child("notifications/canteen");
	notifRef = ref1.child("notifications/general");
	console.log('connected');
	//console.log(ref);
	authData = ref1.getAuth();
	//console.log(authData);
	
	//variables to store profile information
	var name,course,dept,advisor,advisorMob,rn;
	
	//notification variables
	var sub,aud,aud_dept,aud_class;
	
	//variables to hold tel tags for calling
	var tel1 = "tel:";
	
	//if user is authenticated read user info
	if(authData){
		usr = authData.password.email;
		//console.log(usr);
		ref.on("value",function(snapshot){
			//console.log("inside callback");
			snapshot.forEach(function(data){
				//console.log(data.val().email_id);
				if(data.val().email_id == usr){
					//$("#test").html(data.val().role);
					console.log(data.val().first_name);
					name=data.val().first_name;
					title = data.val().title;
					$("#info").html("Hi "+title+" "+name);
					rn = data.val().fac_ID
					dept = data.val().fac_dept;
					adv_for = data.val().advisor_for;
					$("#pro-list").append("<li>ID: "+rn+"</li>");
					$("#pro-list").append("<li>Department: "+dept+"</li>");
					$("#pro-list").append("<li>Advisor for "+adv_for+"</li>");
				}
			});
		});
		
		//Add Notification
		$("#send_notif").bind("click touchstart",function(e){
			sub = $("#notif_sub").val();
			aud = $("#audience").val();
			aud_dept = $("#audience_dept").val();
			aud_class = $("#audience_class").val();
			notifRef.push({subject:sub,audience:aud,audience_dept:aud_dept,audience_class:aud_class});
			$("#notif_sub").val("");
			$("#audience").val("");
			$("#audience_dept").val("");
			$("#audience_class").val("");
			window.alert("Notification Posted")
		});
		
		//Update Notification menu
		notifRef.on("value",function(snap){
			$("#notif_menu").empty();
			snap.forEach(function(dat){
				var intendedTo = dat.val().audience;
				var toDept = dat.val().audience_dept;
				var showSub = dat.val().subject;
				if((intendedTo == 'g') || ((intendedTo == 'f') && (toDept==dept))){
					$("#notif_menu").append("<li>"+showSub+"</li>");
				}
			});
		});
		
		//update canteen special items list
		cantRef.child("spl_items").on("value",function(snap){
			$("#spl-tbl").empty();
			snap.forEach(function(dat){
				var item=dat.val().item;
				var price=dat.val().price;
				$("#spl-tbl").append('<tr><td>'+item+'</td><td>'+price+'</td></tr>');
			});
		});
		
		//update canteen price list
		cantRef.child("price_list").on("value",function(snap){
			$("#price-list").empty();
			snap.forEach(function(dat){
				var item=dat.val().item;
				var price=dat.val().price;
				$("#price-list").append('<tr><td>'+item+'</td><td>'+price+'</td></tr>');
			});
		});
	}
	else{
		window.alert("Please login to continue!");
		window.location.href="index.html";
	}
	
	$("#info").click(function(){
		$("#more_info").toggleClass('overlay');
		$("#more_info").toggle(100);
	});
	
	$("#ctime").click(function(){
		$("#cant_time").toggleClass('overlay');
		$("#price-div").hide(100);
		$("#spl-div").hide(100);
		$("#cant_time").toggle(100);
	});
	
	$("#spl-li").click(function(){
		$("#spl-div").toggleClass('overlay');
		$("#price-div").hide(100);
		$("#cant_time").hide(100);
		$("#spl-div").toggle(100);
	});
	
	$("#price-li").click(function(){
		$("#price-div").toggleClass('overlay');
		$("#spl-div").hide(100);
		$("#cant_time").hide(100);
		$("#price-div").toggle(100);
	});	

    $('#logout').bind('click touchstart',function(e){
	    if(authData){
			ref.unauth();
			ref.off();
			window.location.href="index.html";
		}
	});
});