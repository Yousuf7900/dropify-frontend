import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div className="space-y-24">
            <Helmet>
                <title>Dropify | Home</title>
            </Helmet>

            {/* Hero Section */}
            <section className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white rounded-3xl px-8 py-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Discover. Share. Vote. <br /> Launch the Future of Tech.
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl opacity-90">
                    Dropify is a modern product discovery platform where creators
                    launch innovative tech products and users decide what truly
                    deserves attention.
                </p>
            </section>

            {/* Why Dropify */}
            <section className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose Dropify?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="p-6 border rounded-2xl hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">
                            🚀 Launch Faster
                        </h3>
                        <p className="text-gray-600">
                            Makers can submit their products and get instant
                            visibility among tech enthusiasts and early adopters.
                        </p>
                    </div>

                    <div className="p-6 border rounded-2xl hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">
                            👍 Community Driven
                        </h3>
                        <p className="text-gray-600">
                            Real users upvote and review products, ensuring
                            authentic feedback and genuine traction.
                        </p>
                    </div>

                    <div className="p-6 border rounded-2xl hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">
                            🛡️ Moderated Quality
                        </h3>
                        <p className="text-gray-600">
                            Every product is reviewed by moderators to maintain
                            quality, relevance, and trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">
                    Featured Products
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(item => (
                        <div
                            key={item}
                            className="border rounded-2xl p-5 hover:shadow-lg transition"
                        >
                            <div className="h-36 bg-gray-100 rounded-xl mb-4" />
                            <h3 className="text-lg font-semibold mb-1">
                                Product Name
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                #AI #SaaS #Productivity
                            </p>
                            <button className="btn btn-sm btn-outline w-full">
                                👍 124 Upvotes
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Products */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">
                    Trending Right Now
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(item => (
                        <div
                            key={item}
                            className="border rounded-2xl p-5 hover:shadow-lg transition"
                        >
                            <div className="h-36 bg-gray-100 rounded-xl mb-4" />
                            <h3 className="text-lg font-semibold mb-1">
                                Trending Product
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                #WebApp #Startup
                            </p>
                            <button className="btn btn-sm btn-outline w-full">
                                🔥 300 Votes
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button className="btn btn-primary rounded-xl px-8">
                        Explore All Products
                    </button>
                </div>
            </section>

            {/* Call To Action */}
            <section className="bg-gray-100 rounded-3xl py-16 px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Launch Your Product?
                </h2>
                <p className="max-w-2xl mx-auto text-gray-600 mb-8">
                    Join Dropify today, showcase your product to the world,
                    and let the community decide its success.
                </p>
                <button className="btn btn-primary btn-lg rounded-xl">
                    Get Started on Dropify
                </button>
            </section>
        </div>
    );
};

export default Home;
