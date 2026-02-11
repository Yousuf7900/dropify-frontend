import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://backend-dropify.vercel.app" //http://localhost:5000
});

const usePublic = () => {
    return axiosPublic;
};

export default usePublic;