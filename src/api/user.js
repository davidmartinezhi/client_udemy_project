import {basePath, apiVersion} from "./config";

export function signUpApi(data) {
  //Función que nos da la dirección del sign-up
  const url = `${basePath}/${apiVersion}/sign-up`;

  //Parametros del end-point
  const params = {
    method: "POST", //Tipo de metodo
    body: JSON.stringify(data), //Transforma la data

    headers: {
      //Headers de la petición
      "Content-Type": "application/json",
    },
  };

  //Registra nuestra base de datos
  return fetch(url, params)
    .then((response) => {
      //Investigar que hace esta función
      return response.json();
    })
    .then((result) => {
      console.log(result);
      //Si existe el resultado, lo regresa. Checamos is existe, con el .user
      if (result.user) {
          //Regresando el mensaje dentro de un objeto
        return {
            ok: true,
            message: "Usuario creado correctamente"
        };
      }
      //Regresando el mensaje dentro de un objeto
      return {
          ok: false,
          message: result.message
      };
    })
    .catch((err) => {
      return err.message;
      //Mensaje esta en server/controllers/user.js
      //Donde sale el status 500, que significa que hubo un error
      //Ahi escribí el mensaje
    });
}

