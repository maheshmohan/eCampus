$(document).ready(function() {
	console.log('loaded');	
	$("#more_info").hide();
	$("#cant_time").hide();
	$("#spl-div").hide();
	$("#price-div").hide();
	$("#host_time").hide();
	$("#phn-div").hide();
	
	var ref;
	ref1 = new Firebase('https://ecampus.firebaseio.com/');
	ref = ref1.child("data/studentData");
	cantRef = ref1.child("notifications/canteen");
	cantref2 = ref1.child("notifications/hostel");
	notifRef = ref1.child("notifications/general");
	console.log('connected');
	//console.log(ref);
	authData = ref1.getAuth();
	//console.log(authData);
	
	//variables to store profile information
	var name,course,dept,advisor,advisorMob,rn;
	
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
					$("#info").html("Hi "+name);
					rn = data.val().stud_rollnum
					course = data.val().stud_course;
					dept = data.val().stud_dept;
					advisor = data.val().stud_advisor;
					advisorMob = data.val().advisor_mob;
					tel1+=advisorMob;
					hostel=data.val().stud_hostel;
					room=data.val().stud_room;
					warden = data.val().warden_name;
					wardenmob = data.val().warden_mob;
					tel1+=wardenmob
					$("#pro-list").append("<li>Roll Number: "+rn+"</li>");
					$("#pro-list").append('<li><a href='+tel1+' style="color:rgb(0,0,255);font-size=15px">Advisor Name: '+advisor+'</a></li>');
					$("#pro-list").append("<li>Course: "+course+"</li>");
					$("#pro-list").append("<li>Department: "+dept+"</li>");
					$("#pro-list").append("<li>hostel name: "+hostel+"</li>");
					$("#pro-list").append("<li>hostel room: "+room+"</li>");
					$("#pro-list").append('<li><a href='+tel1+' style="color:rgb(0,0,255);font-size=15px">warden Name: '+warden+'</a></li>');
				}
			});
		});
		//console.log("exit");
		//ref.off();
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
		
		// update hostel cpntact numbers
		
		cantref2.child("contactnumbers").on("value",function(snap){
			$("#phn-num").empty();
			snap.forEach(function(dat){
				console.log("inside hostel");
				var name=dat.val().name;
				var number=dat.val().num;
				console.log(name);
				console.log(number);
				$("#phn-num").append('<li><a href="tel:'+number+'">'+name+'</a></li>');
			});
		});
		
		//Update Notification menu
		notifRef.on("value",function(snap){
			$("#notif_menu").empty();
			snap.forEach(function(dat){
				var intendedTo = dat.val().audience;
				var toDept = dat.val().audience_dept;
				var showSub = dat.val().subject;
				if((intendedTo == 'g') || ((intendedTo == 's'))){
					$("#notif_menu").append("<li>"+showSub+"</li>");
				}
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
	
	$("#htime").click(function(){
		$("#host_time").toggleClass('overlay');
		$("#phn-div").hide(100);
		$("#host_time").toggle(100);
	});
	
	$("#phn-no").click(function(){
		$("#phn-div").toggleClass('overlay');
		$("#host_time").hide(100);
		$("#phn-div").toggle(100);
	});
	

    $('#logout').bind('click touchstart',function(e){
	    if(authData){
			ref.unauth();
			ref.off();
			window.location.href="index.html";
		}
	});
});