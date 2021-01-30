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
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');

	window.addEventListener('resize', function() {
		//Toggle back to close mode
		if (nav.classList.value == 'nav-links nav-active') {
			nav.classList.toggle('nav-active');
		}
		else {
			nav.style.transition = '';
		}

		//Removing animation for the links for navbar
		navLinks.forEach(function(link) {
			if (link.style.animation) {
				link.style.animation = '';
			}
		});

		//Toggle back from X to burger
		if (burger.classList.value == 'burger toggle') {
			burger.classList.toggle('toggle');
		}
	});

	burger.addEventListener('click', function() {
		//Navbar off animation
		nav.style.transition = `transform 0.5s ease-in`;

		//Toggle the navbar
		nav.classList.toggle('nav-active');

		//Navigate navbar links animation
		navLinks.forEach(function(link, index) {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s forwards ${index/7 +0.5}s`;
			}
		});

		//Burger Animation
		burger.classList.toggle('toggle');
	});
}

// For feedback

function submitFeedback() {
	document.getElementById("submit_modal").addEventListener("click", function () {
		var fd_name = document.getElementById('fd_name').value;
		var fd_email = document.getElementById('fd_email').value;
		var fd_message = document.getElementById('fd_message').value;

		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		var d = new Date();
		var hours = d.getHours();
		var mins = d.getMinutes();

		console.log((mins<10));

		//Validates whether the name, email, and phone are valid, if true make
		//make an entry in firebase realtime database. 
		if ((fd_name != "") && (mailformat.test(fd_email) == true)) {
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

			firebase.database().ref('feedback/'+year+'/'+month+'/'+date).push({
				name: fd_name,
				email: fd_email,
				time: hours+':'+mins,
				message: fd_message
			});
			document.getElementById('fd_name').value = "";
			document.getElementById('fd_email').value = "";
			document.getElementById('fd_message').value = "";

			alert("Your feedback has been recorded");
		}
	});
}

function addheaderfooter() {
    $("header").load("/views/header.html", navSlide);
    $("footer").load("/views/footer.html", submitFeedback); 
}

addheaderfooter();