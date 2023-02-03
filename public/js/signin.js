document
  .getElementById("signin-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var request = new XMLHttpRequest();
    request.open("POST", "/signin", true);
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    request.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        var response = JSON.parse(this.responseText);

        if (response.success) {
          window.location.href = "/editDashboard";
        } else {
          alert("Login failed. Please try again.");
        }
      }
    };

    request.send(
      "username=" +
        encodeURIComponent(username) +
        "&password=" +
        encodeURIComponent(password)
    );
  });
