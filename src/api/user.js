import {basePath, apiVersion} from "./config";

export function signUpApi( data ){
    //Función que nos da la dirección del sign-up
    const url = `${basePath}/${apiVersion}/sign-up`;

    //Parametros del end-point
    const params = {
        
        method: "POST", //Tipo de metodo
        body: JSON.stringify(data), //Transforma la data

        headers: {  //Headers de la petición
            "Content-Type": "application/json"
        }
    }
    
    //Registra nuestra base de datos
    fetch(url, params)
        .then(response => {
           console.log(response);
            //return response.json();
        });
        //.then(result => {
        //    return result;
        //})

        
}

