import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <h1>Loading</h1>
    }
    if (!user) {
        return <h1>No user</h1>
    }
    return children;
};

export default PrivateRouter;