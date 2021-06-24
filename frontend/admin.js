var serverHost = "https://node-model.herokuapp.com"
var localHost = "http://localhost:3000"

function authMiddleware() {
  const authToken = localStorage.getItem('auth_token')

  if(!authToken) {
    logout()
    throw console.log('Not Authenticated')
  } 

  return authToken
}

function logout() {
  localStorage.removeItem('auth_token')
  window.location.href = './login.html'
} 

function fetchAllCandidates() {
  fetch(`${serverHost}/models`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${authMiddleware()}`
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      if(res.status == 401 || res.status == 403) logout()
      const candidateTableRows = document.getElementById("data");
      candidateTableRows.innerHTML = ""
      res.forEach((candidate) => {
        const trCandidate = document.createElement("tr");
        const editButton = document.createElement("button");
        const editPhotoButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const editTd = document.createElement("td");
        const editPhotoTd = document.createElement("td");
        const deleteTd = document.createElement("td");

        let candidateFirstName = document.createElement("td");
        let candidateLastName = document.createElement("td");
        let candidateBirthday = document.createElement("td");
        let candidateEmail = document.createElement("td");
        let candidateGender = document.createElement("td");


        candidateFirstName.innerHTML = candidate.firstName;
        candidateLastName.innerHTML = candidate.lastName;
        candidateBirthday.innerHTML = candidate.birthday;
        candidateEmail.innerHTML = candidate.email;
        candidateGender.innerHTML = candidate.gender;
        deleteButton.innerHTML = "X"
        editButton.innerHTML = "Edit"
        editPhotoButton.innerHTML = "Pics"

        candidateTableRows.appendChild(trCandidate);
        trCandidate.appendChild(candidateFirstName);
        trCandidate.appendChild(candidateLastName);
        trCandidate.appendChild(candidateBirthday);
        trCandidate.appendChild(candidateEmail);
        trCandidate.appendChild(candidateGender);
        trCandidate.appendChild(editTd);
        trCandidate.appendChild(editPhotoTd);
        trCandidate.appendChild(deleteTd);
        editTd.appendChild(editButton);
        editPhotoTd.appendChild(editPhotoButton);
        deleteTd.appendChild(deleteButton);

        function callMyFunction() {
          myFunction(candidate);
        }

        function callMyDeleteFunction() {
          //Call delete function
          const hiddenIdEl = document.getElementById("candidate_id")
          hiddenIdEl.value = candidate._id
          $('#deleteModal').show()

        }

        function callEditPhotoFunction() {
          const photo1El = document.createElement('img')
          const photo2El = document.createElement('img')
          const photo3El = document.createElement('img')
          const photo4El = document.createElement('img')

          photo1El.className = 'img-thumbnail';
          photo2El.className = 'img-thumbnail';
          photo3El.className = 'img-thumbnail';
          photo4El.className = 'img-thumbnail';

          photo1El.src = `${serverHost}${candidate.photo1}`;
          photo2El.src = `${serverHost}${candidate.photo2}`;
          photo3El.src = `${serverHost}${candidate.photo3}`;
          photo4El.src = `${serverHost}${candidate.photo4}`;

          const modalPhotoEl = document.getElementById('photo-modal-mody');
          modalPhotoEl.innerHTML = ""
          modalPhotoEl.appendChild(photo1El)
          modalPhotoEl.appendChild(photo2El)
          modalPhotoEl.appendChild(photo3El)
          modalPhotoEl.appendChild(photo4El)

          $('#editPhotosModal').show()
        }
        editButton.addEventListener("click", callMyFunction);
        editPhotoButton.addEventListener("click", callEditPhotoFunction)
        deleteButton.addEventListener("click", callMyDeleteFunction)
      });
    }).catch(err =>  {console.log(err)});
}

function getGenderValue(){
  const femaleRadioEl = document.getElementById("female")

  if(femaleRadioEl.checked) {
    return "female"
  } else {
    return "male"
  }
}

function setGenderValue(gender){
  console.log(gender)
  const maleRadioEl = document.getElementById("male")
  const femaleRadioEl = document.getElementById("female")
  if(gender === "female") {
    femaleRadioEl.checked = true;
    maleRadioEl.checked = false;
  } else {
    femaleRadioEl.checked = false;
    maleRadioEl.checked = true;
  }
}

function myFunction(record) {
  $("#myModal").show();
  const candidateId = document.getElementById("_id");
  const candidateFirstName = document.getElementById("firstName");
  const candidateLasttName = document.getElementById("lastName");
  const candidateBirthday = document.getElementById("birthday");
  const candidateEmail = document.getElementById("email");
  const candidateAddress = document.getElementById("address");
  const candidateCity = document.getElementById("city");
  const candidateState = document.getElementById("state");
  const candidateCountry = document.getElementById("country");
  const candidateZip = document.getElementById("zip");
  const candidateHeight = document.getElementById("height");
  const candidateWeight = document.getElementById("weight");
  const candidateMannequin = document.getElementById("mannequin");
  const candidateShoe = document.getElementById("shoe");
  const candidateWaist = document.getElementById("waist");
  const candidateHip = document.getElementById("hip");
  const candidateBustThorax = document.getElementById("bustTorax");
  const candidateShirt = document.getElementById("shirt");
  const candidateFEyeColor = document.getElementById("eyeColor");
  const candidateHairColor = document.getElementById("hairColor");
  const approvedEl = document.getElementById("approved");

  candidateId.value = record._id
  candidateFirstName.value =
    record.firstName == undefined ? "" : record.firstName;
  candidateLasttName.value =
    record.lastName == undefined ? "" : record.lastName;
  candidateBirthday.value = record.birthday == undefined ? "" : record.birthday;
  candidateEmail.value = record.email == undefined ? "" : record.email;
  setGenderValue(record.gender)
  candidateAddress.value = record.address == undefined ? "" : record.address;
  candidateCity.value = record.city == undefined ? "" : record.city;
  candidateState.value = record.state == undefined ? "" : record.state;
  candidateCountry.value = record.country == undefined ? "" : record.country;
  candidateZip.value = record.zip == undefined ? "" : record.zip;
  candidateHeight.value = record.height == undefined ? "" : record.height;
  candidateWeight.value = record.weight == undefined ? "" : record.weight;
  candidateMannequin.value =
    record.mannequin == undefined ? "" : record.mannequin;
  candidateShoe.value = record.shoe == undefined ? "" : record.shoe;
  candidateWaist.value = record.waist == undefined ? "" : record.waist;
  candidateHip.value = record.hip == undefined ? "" : record.hip;
  candidateBustThorax.value =
    record.bustTorax == undefined ? "" : record.bustTorax;
  candidateShirt.value = record.shirt == undefined ? "" : record.shirt;
  candidateFEyeColor.value =
    record.eyeColor == undefined ? "" : record.eyeColor;
  candidateHairColor.value =
    record.hairColor == undefined ? "" : record.hairColor;
  approvedEl.value = record.approved == undefined ? "" : record.approved;
}

function myDeleteFunction() {
  //candidateId
  const hiddenIdEl = document.getElementById("candidate_id");
  fetch(`${serverHost}/model`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${authMiddleware()}`
    },
    body: JSON.stringify({_id: hiddenIdEl.value})
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      $('#deleteModal').hide();
      fetchAllCandidates()
      alert("Record Deleted Sucessfully")
    })
}

function hideModal() {
  $("#myModal").hide();
}

function hideDeleteModal() {
  $("#deleteModal").hide();
}

$(document).ready(function () {
  fetchAllCandidates()
});

function submitUpdate(){
  const adminFormEl = document.getElementById("admin-form");
  const formData = new FormData(adminFormEl);
  // Display the key/value pairs
  let updatePayLoad = {}
  for (var pair of formData.entries()) {
    updatePayLoad = {...updatePayLoad, [pair[0]]: pair[1]}; 
  }
  console.log(updatePayLoad)

  fetch(`${serverHost}/model`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${authMiddleware()}`
    },
    body: JSON.stringify(updatePayLoad),
  }).then(function (response) {
      return response.text();
    })
    .then(function (res) {
      $('#myModal').hide()
      alert("Record Updated Successfully")
      fetchAllCandidates()
    });
}
