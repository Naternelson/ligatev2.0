import { createBrowserRouter } from "react-router-dom";
import { AuthenticatedLayout } from "../layouts/authenticated";
import { MainLayout } from "../layouts/main";
import { HomePage } from "../pages/home";

export const router = createBrowserRouter([{
    path: "/", 
    element: <MainLayout/>,
    children: [
        {
            index: true, 
            element: <AuthenticatedLayout/>
        }, 
        {
            path: "/home",
            element: <HomePage/>
        }
    ]
}])