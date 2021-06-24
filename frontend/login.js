var serverHost = "https://node-model.herokuapp.com"
var localHost = "http://localhost:3000"

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function login() {
  var loginFormEl = document.getElementById("login_form")
  var formData = new FormData(loginFormEl)

  var loginInfo = {}
  for(pair of formData.entries()) {
    loginInfo = {...loginInfo, [pair[0]]: pair[1]}
  }
  console.log(loginInfo)
  fetch(`${serverHost}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (res) {
      console.log(res)
      localStorage.setItem('auth_token', JSON.parse(res).accessToken)
      window.location.href= "./admin.html"
    })
    .catch(err => {
      alert("Could not validate your credentials")
    })
}

