import { basePath, apiVersion } from "./config";

//Recuperamos el menú
export function getMenuApi(){
    const url = `${basePath}/${apiVersion}/get-menus`;
    
    //Por ser del tipo get, no hace falta crear parametros

    return fetch(url)
        .then( response => {
            return response.json();
        })
        .then( result => {
            return result;
        })
        .catch( error => {
            return error.message;
        })
}