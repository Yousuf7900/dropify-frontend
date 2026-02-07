import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    }
])

export default router;