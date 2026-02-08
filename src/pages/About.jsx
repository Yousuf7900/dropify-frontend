import { Helmet } from "react-helmet-async";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16">
            <Helmet>
                <title>Dropify | About</title>
            </Helmet>
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About Dropify
                    </h1>
                    <p className="text-lg text-gray-600">
                        Empowering creators and businesses to sell digital products effortlessly.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Text */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Who We Are
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Dropify is a modern digital marketplace built to help creators,
                            developers, and entrepreneurs sell digital products with ease.
                            From eBooks to software, Dropify gives you the tools to grow.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is simple: remove complexity and give you a smooth,
                            secure, and scalable selling experience.
                        </p>
                    </div>

                    {/* Stats / Highlights */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow p-6 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600">1K+</h3>
                            <p className="text-gray-600 mt-2">Creators</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600">5K+</h3>
                            <p className="text-gray-600 mt-2">Products</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600">99.9%</h3>
                            <p className="text-gray-600 mt-2">Uptime</p>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 text-center">
                            <h3 className="text-3xl font-bold text-indigo-600">24/7</h3>
                            <p className="text-gray-600 mt-2">Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
