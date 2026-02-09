import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import usePublic from "../hooks/usePublic";
import Swal from "sweetalert2";

const SocialSignin = () => {
    const navigate = useNavigate();
    const { googleSignin } = useAuth();
    const axiosPublic = usePublic();
    const handleGoogle = () => {
        googleSignin()
            .then(res => {
                const user = res.user;
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
                        const name = user.displayName || "there";
                        Swal.fire({
                            title: `Welcome, ${name} Nigga!`,
                            text: "Authentication successful.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => {
                            window.location.href = "/";
                        });
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