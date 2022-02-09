import {basePath, apiVersion} from "./config";

//Dar de alta al usuario en la base de datos
export function signUpApi(data) {
  //Función que nos da la dirección del sign-up
  const url = `${basePath}/${apiVersion}/sign-up`;

  //Parametros del end-point
  const params = {
    method: "POST", //Tipo de metodo
    body: JSON.stringify(data), //Transforma la data, de objeto/valor javascript a texto json

    headers: {
      //Headers de la petición
      "Content-Type": "application/json",
    },
  };

  //Registra nuestra base de datos
  //Fetch:  proporciona una forma fácil y lógica de obtener recursos de forma asíncrona por la red.
  //URL Es la ruta del recurso que queremos obtener
  //Params es lo que nos regresa, lo cual es un objeto response con la respuesta que queremos. Es una respuesta HTTP, no una respuesta json
  return fetch(url, params)
    .then((response) => {
      //Para extraer el contenido del body, de la respuesta. Usamos el .json()
      return response.json();
    })
    .then((result) => {
      //Si existe el resultado, lo regresa. Checamos si existe, con el .user
      if (result.user) {
          //Regresando el mensaje dentro de un objeto
        return {ok: true, message: "Usuario creado correctamente"};
      }
      //Regresando el mensaje dentro de un objeto
      return {ok: false, message: result.message};
    })
    .catch((err) => {
      return { ok: false, message: err.message };
      //Mensaje esta en server/controllers/user.js
      //Donde sale el status 500, que significa que hubo un error
      //Ahi escribí el mensaje
    });
}

//Activar el acceso, comprobando que existe el usuario. Al recibir el access y refresh token
export function signInApi(data) {
  //Construyo la URL
  const url = `${basePath}/${apiVersion}/sign-in`;

  //Parametros del end-point
  const params = {
    method: "POST", //Tipo de metodo
    body: JSON.stringify(data), //Transforma la data, de objeto/valor javascript a texto json

    headers: {
      //Headers de la petición
      "Content-Type": "application/json",
    },
  };

  //Retorno el fectch
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then(result => {
      //Regresa el Access Token y el Refresh Token
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//Accede a todos los usuarios en la base de datos
export function getUsersApi( token ) {
  const url = `${basePath}/${apiVersion}/users`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
  .then( response => {
    return response.json();
  })
  .then( result => {
    return result;
  })
  .catch(err => {
    return err.message;
  });
}

//Regresa unicamente usuarios que esten activos o inactivos
export function getUsersActiveApi( token , status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
  .then( response => {
    return response.json();
  })
  .then( result => {
    return result;
  })
  .catch(err => {
    return err.message;
  });
}

//Sube el avatar del usuario a la base de dato
export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;
  const formData = new FormData(); //Obligatorio para mandar imagen mediante una petición fetch
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData, //La imagen es el form data
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message; //Errores que yo pongo en el servidor, se regresa aquí
    });
}

//Regresa el avatar del usuario
export function getAvatarApi(avatarName){
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url).then( response => {
    return response.url;
  }).catch(err => {
    return err.message;
  })
}