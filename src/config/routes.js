// Layout
import LayoutAdmin from "../layout/LayoutAdmin";

//Admin Page
import AdminHome from '../pages/Admin'; //Al ser importación default, no importa el nombre que le ponga
import AdminSignIn from '../pages/Admin/SignIn';

const routes = [
    {
        //Dentro de admin Este display es para el administrador de la pagina.
        path: "/admin", //Siempre que la ruta tenga una barra admin, va a cargar este layout
        component: LayoutAdmin,
        exact: false,   //No es exact, porque queremos que con admin, siempre tenga este layout
        routes:[
            {
                //Si alguna de estas rutas fueran exact: false. Si se escribe mal el nombre siempre cargaria esa
                //Dentro de admin, siempre nos va a mandar al componente Home
                path: "/admin", //Cuando solo es admin
                component: AdminHome,   //Aparece el home
                exact: true,    //Tiene que ser especifica la ruta para cargar este layout
            },
            {
                //davidmartinez.com/admin/login
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            }
        ]
    }
]

export default routes;