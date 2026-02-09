import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to={'/login'} replace:true />;
};

export default PrivateRouter;