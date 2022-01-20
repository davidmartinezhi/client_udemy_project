//Gestiona los Tokens y checa que el Token no haya caducado en el momento que se haga una petición
//En pocas palabras, valida los Tokens
//Importando constantes
import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

//Paquete para decodificar token
import jwtDecode from "jwt-decode";

//Regresa el valor del accessToken
export function getAccessToken () {
    //Access Token
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

    //Si no existe el accessToken en el localSotrage o regresa falso, regresamos nulo
    if(!accessToken || accessToken === "null"){
        return null;
    }

    //Regresa false si el Token no ha expirado y true cuando el Token ha expirado
    //Si es true, regreso nulo acceso, si es false regreso el accessToken
    return willExpireToken(accessToken) ? null : accessToken;

}

//Regresa el valor del refreshToken
export function getRefreshToken(){
    //Refresh Token
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if(!refreshToken || refreshToken == "null"){
        return null;
    }

    return willExpireToken(refreshToken) ? null : refreshToken;
}


//Comprueba cuando expira el AccessToken
function willExpireToken(token){
    const seconds = 60;
    const metaToken = jwtDecode(token); //Información dentro del token

    const { exp } = metaToken;
    const expExpiredTest = exp -100000000;

    const now = (Date.now() + seconds) / 1000; //Se divide entre mil para pasarlo a una fecha en unix

    //Si la hora actual es mayor a la del token, la fecha ha caducado
    return now > exp;
}