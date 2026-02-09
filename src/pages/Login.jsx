import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router";
import SocialSignin from "../components/SocialSignin";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import usePublic from "../hooks/usePublic";
import Swal from "sweetalert2";

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const axiosPublic = usePublic();
    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'user',
                    createdAt: user.metadata.createdAt,
                    lastLoginAt: user.metadata.lastLoginAt,
                    uid: user.uid
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
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <Helmet>
                <title>Dropify | Login</title>
            </Helmet>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                    Welcome back
                </h1>
                <p className="text-sm text-gray-600 text-center mt-2">
                    Login to continue to Dropify.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <button type="button" className="text-sm link link-hover link-primary">
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            placeholder="Your password"
                            className="input input-bordered w-full"
                            required
                            {...register("password", { required: true })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>

                <div className="divider my-6">OR</div>

                <SocialSignin></SocialSignin>

                <p className="text-center mt-5 text-sm text-gray-600">
                    New to Dropify?{" "}
                    <Link to="/register" className="link link-primary font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
