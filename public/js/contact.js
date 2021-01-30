function submitInformation() {
	document.getElementById("submit_modal").addEventListener("click", function () {
		var fname = document.getElementById('fname').value;
		var lname = document.getElementById('lname').value;
		var email = document.getElementById('email').value;
		var phone = document.getElementById('phone').value;
		var message = document.getElementById('message').value;

		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var phoneno = /^\d{10}$/;

		var d = new Date();
		var hours = d.getHours();
		var mins = d.getMinutes();

		console.log((mins<10));

		//Validates whether the name, email, and phone are valid, if true make
		//make an entry in firebase realtime database. 
		if ((fname != "") && (lname != "") && (mailformat.test(email) == true) && (phoneno.test(phone) == true)) {
			var d = new Date();
			var date = d.getDate();
			var month = d.getMonth()+1;
			var year = d.getFullYear();
			var hours = d.getHours();
			var mins = d.getMinutes();

			if (hours<10 == true) {
				hours = "0" + hours;
			}
			if (mins<10 == true) {
				mins = "0" + mins;
			}

			firebase.database().ref('customer_details/'+year+'/'+month+'/'+date).push({
				name: fname + " " + lname,
				email: email,
				phone: phone,
				time: hours+':'+mins,
				message: message
			});
			document.getElementById('fname').value = "";
			document.getElementById('lname').value = "";
			document.getElementById('email').value = "";
			document.getElementById('phone').value = "";
			document.getElementById('message').value = "";
		}
	});
}

submitInformation();