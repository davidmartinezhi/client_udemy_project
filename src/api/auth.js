//Gestiona los Tokens y checa que el Token no haya caducado en el momento que se haga una petición

//Importando constantes
import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

//Paquete para decodificar token
import jwtDecode from "jwt-decode";

export function getAccessToken () {
    //Retorna el Access Token
    return "Ten el access Token";
}