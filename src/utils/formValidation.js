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



//Helper Functions
function removeClassErrorSuccess(inputData){
    //Remueve la clase de error y success, en el input que le llega
    //Antes de validar algo, primero vamos a remover esas clases
    inputData.classList.remove('success');
    inputData.classList.remove('error');
}