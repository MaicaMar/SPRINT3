
// Exercise 6

    // Variable que lleva un registro de los errores de validación
    let error = 0;

function validate(event) {

    event.preventDefault(); /* Evento que evita la recarga de la página 
    al hacer clic en "Save" en el controlador de eventos del formulario. 
    Así, los mensajes de `console.log` se mostrarán en la consola*/

    // Almacenamos los regex en sus respectivas constantes
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
        clearError(errorName); // Llamar a clearError para eliminar el mensaje de error si es válido.
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

    // Función para mostrar un mensaje de error en un elemento
    // Versión arrow function: const showError = (element, message) => { error++; element.textContent = message;};
    function showError(element) {
        error++;
        element.style.display = 'block';
        element.classList.add('is-invalid'); // Agregar la clase 'is-invalid' para resaltar el campo
    }
    
    // Función para limpiar un mensaje de error en un elemento
    // Versión arrow function: const clearError = (element) => { element.textContent = "";};
    function clearError(element) {
        error--;
        element.style.display = 'none';
        element.classList.remove('is-invalid'); // Quitar la clase 'is-invalid' si no hay errores
    }


/*
EXPLICACIÓN CHAT GPT DEL LA SOLUCIÓN PARA QUE LA PÁGINA NO SE RECARGUE Y ASÍ
SE MUESTREN LOS CONSOLE.LOG DEL ÚLTIMO IF EN LA CONSOLA DEL NAVEGADOR. HAY QUE TENER
EN CUENTA, QUE DE ESTE MODO EL FORMULARIO NO SE ENVIARÍA. NO OBSTANTE, COMO ES UN EJERCICIO,
HE DECIDIDO DEJARLO ASÍ:

1. Event Object (Objeto Evento):

function validate(event) {
    event.preventDefault(); // Evita la recarga de la página al hacer clic en "Save"

    // Resto de tu código de validación...
}

· La función `validate` acepta un parámetro llamado `event`, que es el objeto de evento proporcionado 
automáticamente por el navegador cuando ocurre un evento, en este caso, el evento de envío del formulario.

· `event.preventDefault()` es una llamada a un método del objeto de evento (preventDefault) que se utiliza 
para prevenir el comportamiento predeterminado del navegador asociado con el evento. En este caso, estamos 
previniendo que el formulario se envíe automáticamente y evitando la recarga de la página cuando se hace 
clic en el botón "Save."

2. Controlador de Eventos:

// Agrega un controlador de eventos al formulario para capturar el envío
const form = document.querySelector("form");
form.addEventListener("submit", validate);

· `document.querySelector("form")` se utiliza para seleccionar el formulario en el documento HTML. 
Esto asume que tienes un solo formulario en tu página. Si tienes varios formularios, debes ajustar 
esto para seleccionar el formulario específico al que deseas agregar el comportamiento.

· `form.addEventListener("submit", validate)` agrega un controlador de eventos al formulario. 
El evento que estamos escuchando es "submit," que ocurre cuando se intenta enviar el formulario, 
por ejemplo, al hacer clic en un botón de "Guardar" dentro del formulario.

· Cuando se dispara el evento "submit," el navegador ejecuta la función `validate` que hemos definido 
anteriormente y pasa automáticamente el objeto de evento como argumento.

· Dentro de la función `validate`, `event.preventDefault()` se encarga de evitar la recarga de la página, 
lo que significa que el formulario no se enviará y los `console.log` se ejecutarán según la lógica 
de validación que hayas definido en tu código.

En resumen, esta modificación permite que los mensajes de `console.log` se muestren en la consola 
sin que la página se recargue al hacer clic en el botón "Save." La función `validate` se ejecuta 
cuando se envía el formulario, gracias al controlador de eventos que hemos agregado al formulario.
*/