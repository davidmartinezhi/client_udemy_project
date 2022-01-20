//Gestiona los Tokens y checa que el Token no haya caducado en el momento que se haga una petición

//Importando constantes
import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

//Paquete para decodificar token
import jwtDecode from "jwt-decode";

export function getAccessToken () {
    //Retorna el Access Token
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    //Si no existe el accessToken en el localSotrage o regresa falso, regresamos nulo
    if(!accessToken || accessToken === "null"){
        return null;
    }

    //Checo si el Token ha expirado 


}

//Comprueba cuando expira el AccessToken
function willExpire(){

}