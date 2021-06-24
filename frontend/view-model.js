var serverHost = "https://node-model.herokuapp.com"

window.onload = function() {
    const candidate = localStorage.getItem("viewing_candidate")
    if(!candidate) {
        window.location.href = "./index.html"
    }

    const profileEl = document.getElementById("profile")
    const parsedCandidate = JSON.parse(candidate)

    console.log(parsedCandidate)
    const firstNameEl = document.createElement('h1')
    const heightEl = document.createElement('p')
    const mannequinEl = document.createElement('p')
    const hairColorEl = document.createElement('p')
    const eyeColorEl = document.createElement('p')

    firstNameEl.innerHTML = parsedCandidate.firstName
    heightEl.innerHTML = `Height ${parsedCandidate.height}`
    mannequinEl.innerHTML = `Mannequin ${parsedCandidate.mannequin}`
    hairColorEl.innerHTML = `${parsedCandidate.hairColor}`
    eyeColorEl.innerHTML = `${parsedCandidate.eyeColor}`

    if(parsedCandidate.category === "adultMale") {
        const chestEl = document.createElement('p')
        const shoesEl = document.createElement('p')
        chestEl.innerHTML = `Chest ${parsedCandidate.bustTorax}`
        shoesEl.innerHTML = `Shoes ${parsedCandidate.shoe}`
        profileEl.appendChild(firstNameEl)
        profileEl.appendChild(heightEl)
        profileEl.appendChild(mannequinEl)
        profileEl.appendChild(hairColorEl)
        profileEl.appendChild(eyeColorEl)
        profileEl.appendChild(shoesEl)
    } else if(parsedCandidate.category === "adultFemale") {
        const bustEl = document.createElement('p')
        const waistEl = document.createElement('p')
        const hipsEl = document.createElement('p')
        const shoesEl = document.createElement('p')

        bustEl.innerHTML = `Bust ${parsedCandidate.bustTorax}`
        waistEl.innerHTML = `Waist ${parsedCandidate.waist}`
        hipsEl.innerHTML = `Hips ${parsedCandidate.hip}`
        shoesEl.innerHTML = `Shoes ${parsedCandidate.shoe}`
        profileEl.appendChild(firstNameEl)
        profileEl.appendChild(heightEl)
        profileEl.appendChild(bustEl)
        profileEl.appendChild(waistEl)
        profileEl.appendChild(hipsEl)
        profileEl.appendChild(mannequinEl)
        profileEl.appendChild(hairColorEl)
        profileEl.appendChild(eyeColorEl)
        profileEl.appendChild(shoesEl)
    } else {
        const waistEl = document.createElement('p')
        const bustEl = document.createElement('p')
        const shoesEl = document.createElement('p')
        waistEl.innerHTML = `Waist ${parsedCandidate.waist}`
        bustEl.innerHTML = `Bust ${parsedCandidate.bustTorax}`
        shoesEl.innerHTML = `Footwear ${parsedCandidate.shoe}`

        profileEl.appendChild(firstNameEl)
        profileEl.appendChild(heightEl)
        profileEl.appendChild(waistEl)
        profileEl.appendChild(bustEl)
        profileEl.appendChild(eyeColorEl)
        profileEl.appendChild(hairColorEl)
        profileEl.appendChild(shoesEl)
        profileEl.appendChild(mannequinEl)
    }

    const modelProfileEl = document.getElementById("model-profile-wrapper")
    
    const carouselItem = document.createElement('div')
    carouselItem.className = "carousel-item active"
    const carouselImg = document.createElement('img')
    carouselImg.id = "model-profile-img"
    carouselImg.alt = "Img Not Found"
    carouselImg.src = `${serverHost}${parsedCandidate.photo1}`;
    carouselItem.appendChild(carouselImg)

    const carouselItem2 = document.createElement('div')
    carouselItem2.className = "carousel-item"
    const carouselImg2 = document.createElement('img')
    carouselImg2.id = "model-profile-img"
    carouselImg2.alt = "Img Not Found"
    carouselImg2.src = `${serverHost}${parsedCandidate.photo2}`;
    carouselItem2.appendChild(carouselImg2)

    modelProfileEl.appendChild(carouselItem)
    modelProfileEl.appendChild(carouselItem2)

}