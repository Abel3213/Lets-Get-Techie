// LOGIN VALIDATION

function validateLoginForm() {
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();


    if (email && password == "") {
        alert("Name and Password must be filled out.");
        return false;
    }

    else if (email == "" || password == "") {
        alert("Email must be filled out.");
        return false;
    }

    else if (password.length < 6) {
        alert("Password must be at least 6 characters. Please try again!");
        return false;
    }
    else {
        return true;
    }
};


loginForm.addEventListener('submit', validateLoginForm);

// SIGN UP FORM VALIDATION

function validateSignupForm() {
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();


    if (username && email && password == "") {
        alert("You cannot submit a blank form! must be filled out.");
        return false;
    }

    else if (username == "" || email == "" || password == "") {
        alert("The entire form must be filled out.");
        return false;
    }

    else if (password.length < 6) {
        alert("Your password must be at least 6 characters. Please try again!");
        return false;
    }
    else if (username.length < 4) {
        alert("Your username must be at least 4 characters. Please try again!");
        return false;
    }
    else {
        return true;
    }
};

document.querySelector('.signup-form').addEventListener('submit', validateSignupForm);