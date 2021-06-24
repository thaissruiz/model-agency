var serverHost = "https://node-model.herokuapp.com"
var localHost = "http://localhost:3000"

window.onload = function(){
    const contactFormEl = document.getElementById('contact-form')
    contactFormEl.addEventListener("submit", function submitContactForm(e) {
        const formData = new FormData(contactFormEl)
        let contactPayload = {}
        for(pair of formData) {
            contactPayload = {...contactPayload, [pair[0]]: pair[1]}
        } 
        console.log(contactPayload)
        fetch(`${serverHost}/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactPayload)
        })
        .then(r => r.text())
        .then(res =>  {
            document.getElementById('firstName').value = ""
            document.getElementById('lastName').value = ""
            document.getElementById('email').value = ""
            document.getElementById('textarea').value = ""
            alert(JSON.parse(res).message)
        })

        e.preventDefault()
    })
}