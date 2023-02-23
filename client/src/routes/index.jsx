import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import MascotaDetalle from "../pages/pets/MascotaDetalle";
import MascotaEditar from "../pages/pets/MascotaEditar";
import Mascotas from "../pages/pets/Mascotas";
import MascotasAdd from "../pages/pets/MascotasAdd";

export default createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        errorElement: <NotFound />,
        children:[
            {
                index: true,
                element: <Mascotas />
            },
            {
                path:'pets/new',
                element: <MascotasAdd />
            },
            {
                path:'pets/:id',
                element: <MascotaDetalle />
            },
            {
                path:'pets/:id/edit',
                element: <MascotaEditar />
            }
        ]
    }
]);