document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector("#formulario");
    const divIntentos = document.querySelector("#intentos");

    const nombreInput = document.querySelector("#nombre");
    const apellidosInput = document.querySelector("#apellidos");
    const edadInput = document.querySelector("#edad");
    const nifInput = document.querySelector("#nif");
    const emailInput = document.querySelector("#email");
    const provinciaSelect = document.querySelector("#provincia");
    const fechaInput = document.querySelector("#fecha");
    const telefonoInput = document.querySelector("#telefono");
    const horaInput = document.querySelector("#hora");

    const erroresDiv = document.querySelector("#errores");


    divIntentos.innerHTML = `<p>Intento de Envíos del formulario: Ninguno</p>`;

    const date = new Date();
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000)); //1h

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();
        const confirmacion = confirm("¿Está seguro de que desea enviar el formulario?");

        if(confirmacion){

            nombreInput.focus();
            apellidosInput.focus();
            edadInput.focus();
            nifInput.focus();
            emailInput.focus();
            provinciaSelect.focus();
            fechaInput.focus();
            telefonoInput.focus();
            horaInput.focus();
            horaInput.blur();

            if(document.querySelector("#err_nombre") === null && document.querySelector("#err_apellidos") === null &&
               document.querySelector("#err_edad") === null && document.querySelector("#err_nif") === null &&
               document.querySelector("#err_email") === null && document.querySelector("#err_provincia") === null &&
               document.querySelector("#err_fecha") === null && document.querySelector("#err_telefono") === null &&
               document.querySelector("#err_hora") === null){

                formulario.submit();
            }
        }

        if (document.cookie.indexOf('intentos=') === -1) { // No existe cookie "intentos"

            document.cookie = `intentos=1; expires=${date.toUTCString()}; path=/`;

            divIntentos.innerHTML = `<p>Intento de Envíos del formulario: 1</p>`;

        } else { // Existe cookie "intentos"

            let numIntentos;
            let camposCookies = document.cookie.split(';');

            for (let i = 0; i < camposCookies.length; i++) {

                let cookie = camposCookies[i].trim();
                if (cookie.indexOf('intentos=') === 0) {

                    numIntentos = cookie.substring('intentos='.length, cookie.length); // Extraemos valor cookie "intentos"
                    break;
                }
            }
            numIntentos = parseInt(numIntentos);
            numIntentos++;
            document.cookie = `intentos=${numIntentos}; expires=${date.toUTCString()}; path=/`;

            divIntentos.innerHTML = `<p>Intento de Envíos del formulario: ${numIntentos}</p>`;
        }
    });

    function validarNombre(){
        
        nombreInput.value = nombreInput.value.trim();
        nombreInput.value = nombreInput.value.toUpperCase();
        
        if(/^(?=.*[A-ZÁÉÍÓÚÜÑ])(?!.*[\d\s\W]).+$/.test(nombreInput.value)){

            if(document.querySelector("#err_nombre") != null){document.querySelector("#err_nombre").remove();}

        }else{

            nombreInput.focus();

            if(document.querySelector("#err_nombre") === null){
            
                erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_nombre'>El campo Nombre debe cubrirse con un nombre válido</p>";
            }
        }      
    }

    function validarApellidos(){
        
        apellidosInput.value = apellidosInput.value.toUpperCase();

        if(/^[A-ZÁÉÍÓÚÑÜ]+\s[A-ZÁÉÍÓÚÑÜ]+$/.test(apellidosInput.value)){

            if(document.querySelector("#err_apellidos") != null){document.querySelector("#err_apellidos").remove();}

        }else{

            apellidosInput.focus();

            if(document.querySelector("#err_apellidos") === null){
            
                erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_apellidos'>El campo Apellidos debe cubrirse y deben ser datos válidos</p>"
            }
        }
    }
    
    function validarEdad(){
        
        if(/^\d+$/.test(edadInput.value)){

            const edad = parseInt(edadInput.value);

            if(edad >= 0 && edad <= 105 && document.querySelector("#err_edad") != null){

                document.querySelector("#err_edad").remove();

            }
            if(!(edad >= 0 && edad <= 105) && document.querySelector("#err_edad") === null){        

                edadInput.focus();
                erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_edad'>El campo Edad debe ser un valor numérico del rango 0 a 105</p>"
            }

        }else{

            edadInput.focus();

            if(document.querySelector("#err_edad") === null){
            
                erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_edad'>El campo Edad debe ser un valor numérico del rango 0 a 105</p>"
            }
        }
    }

    function validarNif(){
        /*
        /REGEX/: La expresion comienza y acaba con las barras diagonales /. El significado de cada parte es la siguiente:
        ^: Indica que lo que se indica a continuación debe estar al inicio de la cadena
        \d{8}: En esta posición se permiten 8 carácteres numéricos
        -: En esta posición debe estar presente el caracter guión
        [A-Z]: Se permite cualquier un carácter del rango, es decir cualquier mayúscula
        $: La cadena debe acabar tras la sucesión especificada
        */
        if(/^\d{8}-[A-Z]$/.test(nifInput.value) && document.querySelector("#err_nif") != null){

            document.querySelector("#err_nif").remove();
        }
        
        if(!(/^\d{8}-[A-Z]$/.test(nifInput.value)) && document.querySelector("#err_nif") === null){

            nifInput.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_nif'>El campo Nif tiene que seguir el formato: 12345678-L</p>";
        } 
    }

    function validarEmail(){
        /*
        /REGEX/: La expresion comienza y acaba con las barras diagonales /. El significado de cada parte es la siguiente:
        ^: Indica que lo que se indica a continuación debe estar al inicio de la cadena
        [a-zA-Z0-9._-]+: El + indica que uno o más caracteres de los contenidos en los corchetes debe estar presente en esta posición.
                         Estos son: Los rangos a-z, A-Z, 0-9, y/o los símbolos "." "_" y "-"".
        @: El símbolo @ es obligatorio tras lo especificado anteriormente
        [a-zA-Z0-9._-]+: Tras la arroba tiene que haber otra vez al menos uno o más carácteres do los especificados en los corchetes
        \.: En esta posición debe haber un punto. La \ sirve para escapar el significado especial del caracter ., que también significa "cualquier caracter"
        [a-zA-Z]{2,}: Tras todo lo anterior, deben aparecer 2 o más letras minúsculas o mayúsculas
        $: La cadena debe acabar tras la sucesión especificada
        */
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/.test(emailInput.value) && document.querySelector("#err_email") != null){

            document.querySelector("#err_email").remove();
        }
        
        if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) && document.querySelector("#err_email") === null){

            emailInput.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_email'>El campo E-mail debe cubrirse con un Email válido</p>";
        } 
    }

    function validarProvincia(){

        if((provinciaSelect.value === "CO" || provinciaSelect.value === "LU" || provinciaSelect.value === "OU" || provinciaSelect.value === "PO") &&
            document.querySelector("#err_provincia") != null){

            document.querySelector("#err_provincia").remove();
        }
        
        if((provinciaSelect.value === '0' || provinciaSelect.value === 0) && document.querySelector("#err_provincia") === null){

            provinciaSelect.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_provincia'>El campo Provincia no está cubierto</p>";
        } 
    }

    function validarFecha(){
        /*
        /REGEX/: La expresion comienza y acaba con las barras diagonales /. El significado de cada parte es la siguiente:
        ^: Indica que lo que se indica a continuación debe estar al inicio de la cadena
        (0[1-9]|[1-2][0-9]|3[01]): Estos paréntisis engloban las condiciones | OR, para aceptar solo combinaciones de dos digitos 
                                  que representen todos los valores o dias entre 01 y 31 inclusive.
        \/: En esta posición debe estar presente el caracter /. Se escapa previamente con el caracter \, ya que sinó estaría marcando el fin de la expresión regular
        (0[1-9]|1[0-2]): Lo mismo que en el paréntisis anterior, pero aplicado a los meses, permite entre 01 y 12.
        \/: En esta posición debe estar presente el caracter /. Se escapa previamente con el caracter \, ya que sinó estaría marcando el fin de la expresión regular
        \d{4}: En esta posición se permiten 4 carácteres numéricos consecutivos, es decir, entre 0000 y 9999, que serán los años
        $: La cadena debe acabar tras la sucesión especificada
        */
        if(/^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(fechaInput.value) && document.querySelector("#err_fecha") != null){
           
            document.querySelector("#err_fecha").remove();
        }
        
        if(!(/^(0[1-9]|[1-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(fechaInput.value)) && document.querySelector("#err_fecha") === null){

            fechaInput.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_fecha'>El campo Fecha debe estar cubierta y seguir el formato dd/mm/aaaa</p>";
        }
    }

    function validarTelefono(){
        /*
        /REGEX/: La expresion comienza y acaba con las barras diagonales /. El significado de cada parte es la siguiente:
        ^: Indica que lo que se indica a continuación debe estar al inicio de la cadena
        \d{9}: Entre el inicio y el final de la cadena, se admiten solo 9 carácteres numéricos, es decir entre el 000000000 y el 999999999
        $: La cadena debe acabar tras la sucesión especificada
        */
        if(/^\d{9}$/.test(telefonoInput.value) && document.querySelector("#err_telefono") != null){
           
            document.querySelector("#err_telefono").remove();
        }
        
        if(!(/^\d{9}$/.test(telefonoInput.value)) && document.querySelector("#err_telefono") === null){

            telefonoInput.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_telefono'>El campo Teléfono debe estar cubierto y constar de 9 carácteres numéricos</p>";
        }
    }

    function validarHora(){
        /*
        /REGEX/: La expresion comienza y acaba con las barras diagonales /. El significado de cada parte es la siguiente:
        ^: Indica que lo que se indica a continuación debe estar al inicio de la cadena
        ([01]\d|2[0-3]): Admite las posibilidades 0n 1n (\d representa 1 caracter numérico cualquiera) o 21 22 y 23 al inicio de la cadena.
        :: En esta posición debe estar presente el caracter :.
        ([0-5]\d: Admite las combinaciones 0n 1n 2n 3n 4n y 5n al inicio de la cadena.
        $: La cadena debe acabar tras la sucesión especificada
        */
        if(/^([01]\d|2[0-3]):([0-5]\d)$/.test(horaInput.value) && document.querySelector("#err_hora") != null){
           
            document.querySelector("#err_hora").remove();
        }
        
        if(!(/^([01]\d|2[0-3]):([0-5]\d)$/.test(horaInput.value)) && document.querySelector("#err_hora") === null){

            horaInput.focus();
            erroresDiv.innerHTML = erroresDiv.innerHTML + "<p id='err_hora'>El campo Hora debe estar cubierto y seguir el formato hh:mm</p>";
        }
    }

    nombreInput.addEventListener("blur", validarNombre);
    apellidosInput.addEventListener("blur", validarApellidos);
    edadInput.addEventListener("blur", validarEdad);
    nifInput.addEventListener("blur", validarNif);
    emailInput.addEventListener("blur", validarEmail);
    provinciaSelect.addEventListener("blur", validarProvincia);
    fechaInput.addEventListener("blur", validarFecha);
    telefonoInput.addEventListener("blur", validarTelefono);
    horaInput.addEventListener("blur", validarHora);
});


/*
Pedir confirmación de envío del formulario. Si se confirma el envío realizará el envío de los datos; en
otro caso cancelará el envío
*/

