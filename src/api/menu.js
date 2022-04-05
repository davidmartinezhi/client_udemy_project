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