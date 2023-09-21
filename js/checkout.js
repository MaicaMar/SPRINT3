
// Exercise 6

    let error = 0;

function validate(event) {

    event.preventDefault(); /* Evento que evita la recarga de la página 
    al hacer clic en "Save" en el controlador de eventos del formulario. 
    Así, los mensajes de `console.log` se mostrarán en la consola*/

    const lettersOnly = /^[A-Za-z]+$/
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/
    const numberFormat = /^\d{9}$/
    const passwordFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/

	// Get the error elements
	let errorName = document.getElementById("errorName");
	let errorLastN = document.getElementById("errorLastN");
	let errorEmail = document.getElementById("errorEmail");
	let errorPassword = document.getElementById("errorPassword");
	let errorAddress = document.getElementById("errorAddress");
	let errorPhone = document.getElementById("errorPhone");

    
    // Validate fields entered by the user: name, phone, password, and email
    let fName = document.getElementById("fName").value;
    if (fName === "" || !lettersOnly.test(fName)) {
        showError(errorName);
    } else {
        clearError(errorName);
    }

    let fLastN = document.getElementById("fLastN").value;
    if (fLastN === "" || !lettersOnly.test(fLastN)) {
        showError(errorLastN);
    } else {
        clearError(errorLastN);
    }

    let fEmail = document.getElementById("fEmail").value;
    if (fEmail === "" || !emailFormat.test(fEmail)) {
        showError(errorEmail);
    } else {
        clearError(errorEmail);
    }

    let fPassword = document.getElementById("fPassword").value;
    if (fPassword === "" || !passwordFormat.test(fPassword)) {
        showError(errorPassword);
    } else {
        clearError(errorPassword);
    }

    let fAddress = document.getElementById("fAddress").value;
    if (fAddress === "") {
        showError(errorAddress);
    } else {
        clearError(errorAddress);
    }

    let fPhone = document.getElementById("fPhone").value;
    if (fPhone === "" || !numberFormat.test(fPhone)) {
        showError(errorPhone);
    } else {
        clearError(errorPhone);
    }

     
    if (error > 0) {
        console.log("Error");
    } else {
        console.log("OK");
        console.log("First Name:", document.getElementById("fName").value);
        console.log("Last Name:", document.getElementById("fLastN").value);
        console.log("Email:", document.getElementById("fEmail").value);
        console.log("Password:", document.getElementById("fPassword").value);
        console.log("Address:", document.getElementById("fAddress").value);
        console.log("Phone:", document.getElementById("fPhone").value);
    }

}

// Agrega un controlador de eventos al formulario para capturar el envío
const form = document.querySelector("form");
form.addEventListener("submit", validate);

    function showError(element) {
        error++;
        element.style.display = 'block';
        element.classList.add('is-invalid'); 
    }
    
    function clearError(element) {
        error--;
        element.style.display = 'none';
        element.classList.remove('is-invalid');
    }