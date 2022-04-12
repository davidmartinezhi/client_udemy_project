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

//Actualizamos el menú
export function updateMenuApi(token, menuId, data) {
  const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}

//Activa el menú
export function activateMenuApi( token, menuId, status) {

  const url = `${basePath}/${apiVersion}/activate-menu/${menuId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    //Active lo cambia al status que le estamos mandando
    body: JSON.stringify({active: status})
  };

  return fetch(url, params)
    .then( response => {
      return response.json();
    })
    .then( result => {
      return result.message;
    })
    .catch(err => {
      console.log(err);
    });
}

//Crea nuevos menús
export function addMenuApi(token, menu){
  const url = `${basePath}/${apiVersion}/add-menu`;

  const params = {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(menu)
  }

  return fetch(url, params).then( response => {
    return response.json();
  })
  .then( result => {
    return result.message;
  })
  .catch(err => {
    console.log(err);
  });
}

//Elimina el menú
export function deleteMenuApi(token, menuId){
  const url = `${basePath}/${apiVersion}/delete-menu/${menuId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result.message;
    })
    .catch(err => {
      console.log(err.message);
    });
}