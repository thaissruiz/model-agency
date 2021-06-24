var serverHost = "https://node-model.herokuapp.com";
var localHost = "http://localhost:3000";

window.onload = function () {
  const form = document.getElementById("form");

  form.onsubmit = submit;

  function submit(event) {
    // For this example, don't actually submit the form
    event.preventDefault();
    let gender_value;

    if (document.getElementById("male").checked) {
      gender_value = document.getElementById("male").value;
    } else if (document.getElementById("female").checked) {
      gender_value = document.getElementById("female").value;
    } else {
      gender_value = document.getElementById("other").value;
    }
    //eyeColor
    var elementSelectEyeColor = document.getElementById("eyeColor");
    var eyeColorValue = elementSelectEyeColor.value;

    //heirColor
    var elementSelectHairColor = document.getElementById("hairColor");
    var hairColorValue = elementSelectHairColor.value;

    var photo1El = document.getElementById("photo1");

    const candidates = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      birthday: document.getElementById("birthday").value,
      email: document.getElementById("email").value,
      gender: gender_value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      country: document.getElementById("country").value,
      zip: document.getElementById("zip").value,
      height: document.getElementById("height").value,
      weight: document.getElementById("weight").value,
      mannequin: document.getElementById("mannequin").value,
      shoe: document.getElementById("shoe").value,
      waist: document.getElementById("waist").value,
      hip: document.getElementById("hip").value,
      bustTorax: document.getElementById("bustTorax").value,
      shirt: document.getElementById("shirt").value,
      eyeColor: eyeColorValue,
      hairColor: hairColorValue,
      photo1: "photo1",
      photo2: "photo2",
      photo3: "photo3",
      photo4: "photo4",
    };

    console.log(candidates)

    const joinUsFormEl = document.getElementById("form");
    const formData = new FormData(joinUsFormEl);

    fetch(`${serverHost}/upload`, {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (upload_response) {
        fetch(`${serverHost}/model`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...candidates,
            photo1: upload_response[0],
            photo2: upload_response[1],
            photo3: upload_response[2],
            photo4: upload_response[3],
          }),
        })
          .then(function (response) {
            return response.text();
          })
          .then(function (res) {
            const responseStatus = JSON.parse(res).message;
            if (responseStatus == "Created sucessfuly") {
              alert(
                "Thank you for your application. \nWe'll get in touch soon!"
              );
            }
          });
      });
  }
};
