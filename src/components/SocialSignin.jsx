import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import usePublic from "../hooks/usePublic";

const SocialSignin = () => {
    const navigate = useNavigate();
    const { googleSignin } = useAuth();
    const axiosPublic = usePublic();
    const handleGoogle = () => {
        googleSignin()
            .then(res => {
                const user = res.user;
                console.log(user);  // firebase log
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    role: 'user',
                    createdAt: user.metadata.createdAt,
                    lastLoginAt: user.metadata.lastLoginAt
                };

                axiosPublic.patch('/users', userData)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
                navigate('/');
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <button onClick={handleGoogle} type="button" className="btn btn-outline w-full">
            <FaGoogle />Continue with Google
        </button>
    )
};

export default SocialSignin;