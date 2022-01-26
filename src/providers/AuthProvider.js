import React, { useState, useEffect, createContext } from "react";

import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
      user: null,
      isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

function checkUserLogin(setUser){
//Checa que el usuario esté logeado
    
    const accessToken = getAccessTokenApi();

    //Si no existe el access token o ha caducado
    if(!accessToken){
        const refreshToken = getAccessTokenApi();

        //Checo si el refreshToken también ha caducado
        if(!refreshToken){
            logout();   //Desloggeamos al usuario

            setUser({   
                user: null, //Desactivamos al usuario
                isLoading: false //Avisamos que ya se termino de cargar la pagina
            });
        } 
        //Si aún no caduca el refreshToken
        else{
            //Le damos un refresh al Token activo, para que cambie constantemente
            //Esto para mayor seguridad
            refreshAccessTokenApi(refreshToken);
        }

    }
    //Si aún es valido el accessToken
    else{
        setUser({
            user: accessToken,
            isLoading: false
        });
    }

}