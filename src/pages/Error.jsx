import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <Helmet>
                <title>Dropify | Error</title>
            </Helmet>
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-8">
                    Sorry, the page you’re looking for doesn’t exist or has been moved.
                </p>

                <div className="flex justify-center gap-4">
                    {/* Go Back */}
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>

                    {/* Go Home */}
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
