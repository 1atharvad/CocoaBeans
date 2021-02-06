function submitInformation() {
	$(".contact-form #submit_modal").on("click", () => {
		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		var phoneno = /^\d{10}$/;

		//Validates whether the name, email, and phone are valid, if true make
		//make an entry in firebase realtime database. 
		if (($('.contact-form #fname').val() !== "") && ($('.contact-form #lname').val() !== "") && (mailformat.test($('.contact-form #email').val()) === true) && (phoneno.test($('.contact-form #phone').val()) === true)) {
			var date = new Date();

			firebase.database().ref(`customer_details/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`).push({
				name: `${$('.contact-form #fname').val()} ${$('.contact-form #lname').val()}`,
				email: $('.contact-form #email').val(),
				phone: $('.contact-form #phone').val(),
				time: `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`,
				message: $('.contact-form #message').val()
			});

			$('.contact-form #fname').val("");
			$('.contact-form #lname').val("");
			$('.contact-form #email').val("");
			$('.contact-form #phone').val("");
			$('.contact-form #message').val("");
		}
	});
}

submitInformation();