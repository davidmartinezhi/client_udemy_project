// Layout
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutBasic from '../layout/LayoutBasic';

//Admin Page
import AdminHome from '../pages/Admin'; //Al ser importación default, no importa el nombre que le ponga
import AdminSignIn from '../pages/Admin/SignIn';

//Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

//Other
import Error404 from '../pages/Error404';

const routes = [
    //Configuración de rutas admin
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
            },
            //Siempre se pone el error 404 al final de las rutas
            {
                //Si no se cumple ninguna ruta, se despliega este componente
                //No pongo ruta, porque no es posible saber que va a escribir el usuario
                component: Error404,
                
            }
        ]
    },

    //Rutas de la pagina para el end-user
    {
        path: "/", //Desde la raíz
        component: LayoutBasic,
        exact: false, //Pueden existir diferentes raices como la de admin. pero esta será la misma siempre
        routes: [
            {
                path: "/",
                component: Home,
                exact: true
            },
            {
                path: "/contact",
                component: Contact,
                exact: true
            },
            //Error 404
            {
                component: Error404
            }
        ]

    }
]

export default routes;