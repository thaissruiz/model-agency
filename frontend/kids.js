var serverHost = "https://node-model.herokuapp.com";
var localHost = "http://localhost:3000";

window.onload = function () {
  function getMaleCandidates() {
    const section = document.createElement("section");
    const divContainer = document.createElement("div");
    divContainer.className = "container";
    const divRow = document.createElement("div");
    divRow.className = "row";

    fetch(`${serverHost}/models/kids`, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (candidateList) {
        candidateList.forEach((maleCandidate) => {
          const divCol4 = document.createElement("div");
          divCol4.className = "col-4";
          const divModelSection = document.createElement("div");
          divModelSection.className = "model-section";
          const aEl = document.createElement("a");

          const imgEL = document.createElement("img");
          imgEL.id = "model-grid";
          imgEL.src = `${serverHost}${maleCandidate.photo1}`;

          function mouseOver() {
            if(imgEL) {
              imgEL.src = `${serverHost}${maleCandidate.photo2}`;
            }
          };

          function mouseOut() {
            if(imgEL) {
              imgEL.src = `${serverHost}${maleCandidate.photo1}`;
            }
          };

          function seeCandidateProfile() {
            localStorage.setItem("viewing_candidate", JSON.stringify({...maleCandidate, category: 'adultMale'}))
            window.location.href = "./view-model.html"
          };

          imgEL.addEventListener("mouseover",mouseOver);
          imgEL.addEventListener("mouseout", mouseOut);
          imgEL.addEventListener("click", seeCandidateProfile)

          const h2el = document.createElement("h2");
          h2el.innerHTML = maleCandidate.firstName;


          section.appendChild(divContainer);
          divContainer.appendChild(divRow);
          aEl.appendChild(imgEL);
          divModelSection.appendChild(aEl);
          divModelSection.appendChild(h2el);
          divCol4.appendChild(divModelSection);
          divRow.appendChild(divCol4)

          const modelsPage = document.getElementById("modelsPage");
          modelsPage.appendChild(section);
        });
      });
  }
  getMaleCandidates();
};
