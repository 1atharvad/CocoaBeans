var firebaseConfig = {
    apiKey: "AIzaSyAk2SHXVYyoCFI6t9hjGGL2tWkmqIHqpmM",
    authDomain: "cocoa-beans.firebaseapp.com",
    projectId: "cocoa-beans",
    storageBucket: "cocoa-beans.appspot.com",
    messagingSenderId: "801863231820",
    appId: "1:801863231820:web:3902907249ba66df8387e9",
    measurementId: "G-XL2XDRVE0W"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//For navbar

function navSlide() {
	$(window).on('resize', () => {
		//Toggle back to close mode
		if ($('.nav-links').hasClass('nav-active')) {
			$('.nav-active').removeClass('nav-active');
		} else {
			$('.nav-links').css({transition: ""});
		}

		//Removing animation for the links for navbar
		$('.nav-links li').each((_, link) => {
			if (link.style.animation) {
				link.style.animation = '';
			}
		});

		//Toggle back from X to burger
		if ($('.burger').hasClass('toggle')) {
			$('.burger').toggleClass('toggle');
		}
	});

	$('.burger').on('click', () => {
		//Navbar off animation
		$('.nav-links').css({transition: `transform 0.5s ease-in`});

		//Toggle the navbar
		$('.nav-links').toggleClass('nav-active');

		//Navigate navbar links animation
		$('.nav-links li').each(function(index, link) {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s forwards ${index/7 +0.5}s`;
			}
		});

		//Burger Animation
		$('.burger').toggleClass('toggle');
	});
}

// For feedback

function submitFeedback() {
	$(".feedback-form #submit_modal").on("click", () => {
		const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		//Validates whether the name, email, and phone are valid, if true make
		//make an entry in firebase realtime database. 
		if (($('.feedback-form #fd_name').val() !== "") && (mailformat.test($('.feedback-form #fd_email').val()) === true)) {
			var date = new Date();

			firebase.database().ref(`feedback/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`).push({
				name: $('.feedback-form #fd_name').val(),
				email: $('.feedback-form #fd_name').val(),
				time: `${`0${date.getHours()}`.slice(-2)}:${`0${date.getMinutes()}`.slice(-2)}`,
				message: $('.feedback-form #fd_message').val()
			});
			$('.feedback-form #fd_name').val("");
			$('.feedback-form #fd_email').val("");
			$('.feedback-form #fd_message').val("");

			alert("Your feedback has been recorded");
		}
	});
}

function addheaderfooter() {
    $("header").load("/views/header.html", navSlide);
    $("footer").load("/views/footer.html", submitFeedback); 
}

addheaderfooter();