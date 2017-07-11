  $(document).ready(function(){
		console.log('loaded');	
		var role,ref,email;
		ref1 = new Firebase('https://ecampus.firebaseio.com/');
		ref = ref1.child("Login");
		console.log('connected');


	  $('.log-btn').bind('click touchstart',function(e){
		ref.unauth();
		var usr = $('#UserName').val();
		var pwd = $('#Passwod').val();
		ref.authWithPassword({
		  email    : usr,
		  password : pwd
		}, function(error, authData) {
			  if (error) {
				console.log("Login Failed!", error);
				//window.alert("Login Failed: Please check your credentials/contact the admin");
				$('.log-status').addClass('wrong-entry');
				$('.alert').fadeIn(500);
				setTimeout( "$('.alert').fadeOut(1500);",3000 );
				$('.form-control').keypress(function(){
					$('.log-status').removeClass('wrong-entry');
				});
			  } else {
				ref.on("value",function(snapshot){
					console.log("inside callback");
					snapshot.forEach(function(data){
						console.log(data.val().email);
						if(data.val().email == usr){
							//$("#test").html(data.val().role);
							console.log(data.val().role);
							role=data.val().role;
						}
					});
				});
				//debug msg
				console.log(role);
				
				//redirect to respective pages
				switch(role){
					case 'a':{
						window.location.href="admin_home.html";
						break;
					}
					case 's':{
						window.location.href="student_home.html";
						break;
					}
					case 'f':{
						window.location.href="faculty_home.html";
						break;
					} 
					case 'h':{ 
						window.location.href="hostel_home.html";
						break;
					}
					case 'c':{
						window.location.href="canteen_home.html";
						break;
					}
				}
			}
		});
	  });
        

    });