export function minLengthValidation(inputData, minLength) {
    //Valida longitud del input
    const { value } = inputData;

    removeClassErrorSuccess(inputData);

    if(value.length >= minLength){
        inputData.classList.add('success');
        return true;
    } else {
        inputData.classList.add('error');
        return false;
    }

}

export function emailValidation(inputData){
    //Valida el correo electronico ingresado

    //Expresión regular para validar emails
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData;

    removeClassErrorSuccess(inputData);

    const resultValidation = emailValid.test(value);
    if(resultValidation){
        inputData.classList.add('success');
        return true;
    } else{
        inputData.classList.add('error');
        return false;
    }
}

//Helper Functions
function removeClassErrorSuccess(inputData){
    //Remueve la clase de error y success, en el input que le llega
    //Antes de validar algo, primero vamos a remover esas clases
    inputData.classList.remove('success');
    inputData.classList.remove('error');
}