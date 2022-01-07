export function minLengthValidation(inputData, minLength) {
    //Valida longitud del input
    const { value } = inputData;

};



//Helper Functions
function removeClassErrorSuccess(inputData){
    //Remueve la clase de error y success, en el input que le llega
    //Antes de validar algo, primero vamos a remover esas clases
    inputData.classlist.remove('success');
    inputData.classlist.remove('success');
}