import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

const useSecure = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logOut } = useAuth();

    useEffect(() => {
        const reqId = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                } else {
                    delete config.headers.authorization;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const resId = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error?.response?.status;

                if ((status === 401 || status === 403) && location.pathname !== "/login") {
                    await logOut();
                    navigate("/login", { replace: true });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqId);
            axiosSecure.interceptors.response.eject(resId);
        };
    }, [navigate, logOut, location.pathname]);

    return axiosSecure;
};

export default useSecure;
