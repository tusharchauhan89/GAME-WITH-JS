document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission


    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    console.log("Username: " + username);
    console.log("Password: " + password);


});