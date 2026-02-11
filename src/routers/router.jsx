import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../layouts/DashboardLayout";
import AddProduct from "../pages/AddProduct";
import DashboardOverview from "../pages/DashboardOverview";
import MyProducts from "../pages/MyProducts";
import MyProfile from "../pages/MyProfile";
import AllUsers from "../pages/AllUsers";
import ManageCoupons from "../pages/ManageCoupons";
import AdminStat from "../pages/AdminStat";
import ProductQueue from "../pages/ProductQueue";
import ReportedContent from "../pages/ReportedContent";
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/products',
                element: <Products></Products>
            },
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    // Dashboard routes
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [
            {
                path: '',
                element: <DashboardOverview></DashboardOverview>
            },
            {
                path: 'add-products',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },

            // admin part
            {
                path: 'manage-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'manage-coupons',
                element: <ManageCoupons></ManageCoupons>
            },
            {
                path: 'admin-stats',
                element: <AdminStat></AdminStat>
            },

            // moderator
            {
                path: 'product-queue',
                element: <ProductQueue></ProductQueue>
            },
            {
                path: 'reported-content',
                element: <ReportedContent></ReportedContent>
            }
        ]
    }
])

export default router;