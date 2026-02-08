import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import SocialSignin from "../components/SocialSignin";
import { updateProfile } from "firebase/auth";
import usePublic from "../hooks/usePublic";

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const axiosPublic = usePublic();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(res => {
                const createdUser = res.user;
                updateProfile(createdUser, {
                    displayName: data.name,
                    photoURL: data.photoURL
                });
                const userData = {
                    name: data.name,
                    email: data.email,
                    photoURL: data.photoURL,
                    role: 'user',
                    createdAt: createdUser.metadata.createdAt,
                    lastLoginAt: createdUser.metadata.lastLoginAt,
                    uid: createdUser.uid
                };
                axiosPublic.patch('/users', userData)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            })
            .catch(err => {
                console.log(err.message);
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <Helmet>
                <title>Dropify | Register</title>
            </Helmet>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                    Create your account
                </h1>
                <p className="text-sm text-gray-600 text-center mt-2">
                    Join Dropify and start your journey.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                            required
                            {...register('name', { required: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="input input-bordered w-full"
                            required
                            {...register('email', { required: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            className="input input-bordered w-full"
                            required
                            {...register('password', { required: true })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Use at least 6 characters.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered w-full"
                            {...register("photoURL", { required: true })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </form>

                <div className="divider my-6">OR</div>

                <SocialSignin></SocialSignin>

                <p className="text-center mt-5 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
