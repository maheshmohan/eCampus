$(document).ready(function() {
	console.log('loaded');	
	$("#more_info").hide();
	$("#cant_time").hide();
	$("#spl-div").hide();
	$("#price-div").hide();
	$("#add_spl_div").hide();
	$("#add_daily_div").hide();
	$("#del_daily_div").hide();
	$("#del_spl_div").hide();
	
	var ref;
	ref1 = new Firebase('https://ecampus.firebaseio.com/');
	ref = ref1.child("data/csData");
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
					$("#info").html("Hi "+name);
				}
			});
		});
		
		//Add Daily Item
		$("#daily_add").bind("click touchstart",function(e){
			item = $("#daily_item").val();
			price = $("#daily_price").val();
			cantRef.child("price_list").push({item:item,price:price});
			window.alert("Item Added");
		});
		
		//Add Special Item
		$("#spl_add").bind("click touchstart",function(e){
			item = $("#spl_item").val();
			price = $("#spl_price").val();
			
			cantRef.child("spl_items").push({item:item,price:price});
			window.alert("Item Added");
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
	
	//populate daily items
	$("#del_daily").click(function(){
		$("#del_daily_div").toggleClass('overlay');
		$("#del_daily_div").toggle(100);
		cantRef.child('price_list').on("value",function(snap2){
			$("#daily_sel").empty();
			$("#daily_sel").append('<option value="">Choose ID</option>');
			snap2.forEach(function(dat2){
				cant_key = dat2.key();
				cant_id = dat2.val().item;
				$("#daily_sel").append('<option value="'+cant_key+'">'+cant_id+'</option>');
			});
		});
	});
	
	//delete daily item
	$('#daily_del').bind('click touchstart',function(e){
		cant_selected_key = $("#daily_sel").val();
		console.log(cant_selected_key);
		cantRef.child('price_list/'+cant_selected_key).remove();
		window.alert("Record Removed");
	});
	
	//populate daily items
	$("#del_spl").click(function(){
		$("#del_spl_div").toggleClass('overlay');
		$("#del_spl_div").toggle(100);
		cantRef.child('spl_items').on("value",function(snap2){
			$("#spl_sel").empty();
			$("#spl_sel").append('<option value="">Choose ID</option>');
			snap2.forEach(function(dat2){
				cant_key = dat2.key();
				cant_id = dat2.val().item;
				$("#spl_sel").append('<option value="'+cant_key+'">'+cant_id+'</option>');
			});
		});
	});
	
	//delete daily item
	$('#spl_del').bind('click touchstart',function(e){
		cant_selected_key = $("#spl_sel").val();
		console.log(cant_selected_key);
		cantRef.child('spl_items/'+cant_selected_key).remove();
		window.alert("Record Removed");
	});
	
	/*$("#info").click(function(){
		$("#more_info").toggleClass('overlay');
		$("#more_info").toggle(100);
	});*/
	
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
	
	$("#add_daily").click(function(){
		$("#add_daily_div").toggleClass('overlay');
		$("#add_daily_div").toggle(100);
	});
	
	$("#add_spl").click(function(){
		$("#add_spl_div").toggleClass('overlay');
		$("#add_spl_div").toggle(100);
	});

    $('#logout').bind('click touchstart',function(e){
	    if(authData){
			ref.unauth();
			ref.off();
			window.location.href="index.html";
		}
	});
});