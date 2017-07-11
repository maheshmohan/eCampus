$(document).ready(function() {
console.log('loaded');
var ref,userRef,studRef;
ref = new Firebase('https://ecampus.firebaseio.com/');
dataRef = ref.child('data/studentData');
loginRef = ref.child('/Login');

window.alert("firebase connected");
console.log('firebase connected');
$('#send').bind('click touchstart',function(e){
	usr = $('#mail').val();
	pwd = $('#pwd').val();
	ref.createUser({
		email:usr,
		password:pwd
	},function(error,userData){
		if (error) {
			window.alert("Error creating user:", error);
			console.log("Error creating user:", error);
		}else{
			window.alert("Successfully created user account with uid:", userData.uid);
			console.log("Successfully created user account with uid:", userData.uid);
		}
	});
	
	var name = $("#name").val();
	var rn = $("#rollnum").val();
	var course = $("#course").val();
	var clas = $("#class").val();
	var sem = $("#sem").val();
	var dept = $("#dept").val();
	var cgpa = $("#cgpa").val();
	var atdn = $("#attendance").val();
	var adv = $("#adv").val();
	var ph = $("#phone").val();
	dataRef.push({
		name:name,
		rollnum:rn,
		course:course,
		Class:clas,
		Semester:sem,
		Department:dept,
		CGPA:cgpa,
		marks:{sub1:{},sub2:{},sub3:{},sub4:{},sub5:{},sub6:{}},
		Attendance:atdn,
		Advisor:adv,
		email:usr,
		Phone:ph,
		hostel:{Hostel_Name:null,Room_Num:null}
	});
	loginRef.push({
		email:usr,
		role:'s'
	});
	
	console.log('data pushed');
	window.alert('data pushed');
	$('#uID').val();
	$('#pwd').val();
	});
});