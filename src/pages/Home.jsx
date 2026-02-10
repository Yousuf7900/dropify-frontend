import { Helmet } from "react-helmet-async";
import { Link } from "react-router";
import Banner from "./HomeContents.jsx/Banner";
import TrendingProducts from "./TrendingProducts";
import FeaturedProducts from "./HomeContents.jsx/FeaturedProducts";

const Home = () => {
    return (
        <div className="space-y-14 md:space-y-20">
            <Helmet>
                <title>Dropify | Home</title>
            </Helmet>

            {/* Hero */}
            <section className="rounded-3xl overflow-hidden">
                <Banner />
            </section>

            <section className="max-w-7xl mx-auto px-4">
                <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                        <p className="mt-2 text-base-content/70">
                            Fresh releases — newest first. Upvote your favorites.
                        </p>
                    </div>

                    <Link to="/products" className="btn btn-sm md:btn-md rounded-xl">
                        See all
                    </Link>
                </div>

                <FeaturedProducts />
            </section>



            {/* Why Dropify */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold">Why Choose Dropify?</h2>
                    <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
                        Launch, get feedback, and grow with a community that cares about quality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <div className="p-6 border border-base-200 rounded-2xl bg-base-100 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">🚀 Launch Faster</h3>
                        <p className="text-base-content/70">
                            Makers can submit products and get visibility among early adopters.
                        </p>
                    </div>

                    <div className="p-6 border border-base-200 rounded-2xl bg-base-100 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">👍 Community Driven</h3>
                        <p className="text-base-content/70">
                            Users upvote and review products for real feedback and traction.
                        </p>
                    </div>

                    <div className="p-6 border border-base-200 rounded-2xl bg-base-100 hover:shadow-lg transition">
                        <h3 className="text-xl font-semibold mb-3">🛡️ Moderated Quality</h3>
                        <p className="text-base-content/70">
                            Moderators review submissions to keep quality and trust high.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <TrendingProducts />


            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="bg-base-200/40 rounded-3xl py-12 md:py-16 px-6 md:px-10 text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        Ready to Launch Your Product?
                    </h2>
                    <p className="max-w-2xl mx-auto text-base-content/70 mb-8">
                        Join Dropify today, showcase your product to the world, and let the community
                        decide its success.
                    </p>

                    <Link to="/dashboard/add-product" className="btn btn-primary btn-lg rounded-xl">
                        Get Started on Dropify
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
