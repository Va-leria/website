// import {checkSignData} from './signin.js';

// Get the form element
const form = document.getElementById('signin_form');                    

// Add a form submit event listener
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Access and log the values
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    console.log(`Login: ${login}, Password: ${password}`);
});

// var data = new FormData(document.getElementById("demoA"));

//   // (B2) AJAX FETCH
//   fetch("SERVER-SCRIPT", { method:"post", body:data })
//   .then(res => res.text())
//   .then(txt => console.log(txt))
//   .catch(err => console.error(err));