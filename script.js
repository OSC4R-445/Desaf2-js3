// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and input fields using IDs or other selectors
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const claveInput = document.getElementById('clave');
    const telefonoInput = document.getElementById('telefono');
    const ciudadSelect = document.querySelector('select[name="ciudad"]');
    const terminosCheckbox = document.getElementById('terminos'); // Get the checkbox

    // Check if all required elements were found
    if (form && nombreInput && correoInput && claveInput && telefonoInput && ciudadSelect && terminosCheckbox) { // Added terminosCheckbox check
        form.addEventListener('submit', (event) => {
            // Get the current values from the input fields
            const nombreCompleto = nombreInput.value;
            const correo = correoInput.value;
            const clave = claveInput.value; // Get password value (including any spaces)
            const telefono = telefonoInput.value;
            const ciudadValue = ciudadSelect.value;
            const terminosChecked = terminosCheckbox.checked; // Get checkbox state

            // --- Validation Rules ---
            // Name Regex: Two words, starting uppercase, rest lowercase letters
            const nameRegex = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
            // Email Regex: Basic pattern - characters@characters.characters (no spaces)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Password length constraints
            const minPasswordLength = 6;
            const maxPasswordLength = 10;
            // Telephone Regex: Only digits (0-9) and the plus sign (+) allowed
            const phoneRegex = /^[0-9+]+$/;
            // City Select: Default value is "0"
            const defaultCityValue = "0";

            // Trim input values (except password)
            const trimmedNombre = nombreCompleto.trim();
            const trimmedCorreo = correo.trim();
            const trimmedTelefono = telefono.trim();
            // Password validation uses the raw 'clave' value below

            let isValid = true;
            let errorMessages = []; // Store multiple errors if needed

            // --- Validate Name ---
            if (!trimmedNombre || !nameRegex.test(trimmedNombre)) {
                isValid = false;
                errorMessages.push('Nombre y Apellido: Porfavor solo ingrese su primer nombre y apellido. con la primera letra mayuscula y las demas en minuscula');
            }

            // --- Validate Email ---
            if (!trimmedCorreo || !emailRegex.test(trimmedCorreo)) {
                isValid = false;
                errorMessages.push('Correo Electronico: porfavor ingrese un correo valido (e.j usario@ejemplo.com).');
            }

            // --- Validate Password ---
            if (clave.length < minPasswordLength || clave.length > maxPasswordLength) {
                isValid = false;
                errorMessages.push(`Contraseña: debe ser entre ${minPasswordLength} y ${maxPasswordLength} caracteres.`);
            }

            // --- Validate Telephone ---
            if (!trimmedTelefono || !phoneRegex.test(trimmedTelefono)) {
                isValid = false;
                errorMessages.push('Telefono: solo ingrese su numero sin espacios ni letras.');
            }

            // --- Validate City Selection ---
            if (ciudadValue === defaultCityValue) {
                isValid = false;
                errorMessages.push('Ciudad: porfavor seleccione tu ciudad en la lista');
            }

            // --- Validate Terms and Conditions Checkbox ---
            if (!terminosChecked) {
                isValid = false;
                errorMessages.push('Terminos y Servicios: debes aceptar los terminos y condiciones para registrarte.');
            }


            // --- Handle Validation Results ---
            if (!isValid) {
                // Prevent the default form submission behavior
                event.preventDefault();
                // Show an alert with all collected error messages
                alert(errorMessages.join('\n\n')); // Join errors with newlines for readability
            }
            // If isValid is true, the form will submit as usual
        });
    } else {
        // Updated warning message to reflect how elements are selected
        if (!form) {
            console.warn('Could not find the form element using document.querySelector("form"). Validation script not attached.');
        }
        if (!nombreInput) {
            console.warn('Could not find the nombre (id="nombre") element. Validation script not attached.');
        }
        if (!correoInput) {
            console.warn('Could not find the correo (id="correo") element. Validation script not attached.');
        }
        if (!claveInput) {
            console.warn('Could not find the clave (id="clave") element. Validation script not attached.');
        }
        if (!telefonoInput) {
            console.warn('Could not find the telefono (id="telefono") element. Validation script not attached.');
        }
        if (!ciudadSelect) {
            console.warn('Could not find the city select element using document.querySelector(\'select[name="ciudad"]\'). Validation script not attached.');
        }
        if (!terminosCheckbox) { // Added warning for terms checkbox
            console.warn('Could not find the terms checkbox (id="terminos") element. Validation script not attached.');
        }
    }
});