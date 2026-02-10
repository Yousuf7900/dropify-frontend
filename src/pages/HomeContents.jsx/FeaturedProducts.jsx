import useFeaturedProduct from "../../hooks/useFeaturedProduct";

const FeaturedProducts = () => {
    const [featured, loading] = useFeaturedProduct();

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Featured Products</h2>
                    <p className="mt-2 text-gray-600">Loading handpicked products...</p>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-3xl border bg-white/60 backdrop-blur p-4 shadow-sm"
                        >
                            <div className="h-44 rounded-2xl bg-gray-100 animate-pulse" />
                            <div className="mt-4 h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                            <div className="mt-2 h-3 w-full bg-gray-100 rounded animate-pulse" />
                            <div className="mt-2 h-3 w-5/6 bg-gray-100 rounded animate-pulse" />
                            <div className="mt-4 flex gap-2">
                                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                                <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            {/* Heading */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    Featured Products
                </h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                    Fresh picks curated by our community. Discover tools, apps, and ideas
                    worth trying.
                </p>
            </div>

            {/* Grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featured.map((product) => (
                    <div
                        key={product._id}
                        className="group relative rounded-3xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                        {/* soft hover glow */}
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-200 blur-3xl opacity-40" />
                            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-200 blur-3xl opacity-30" />
                        </div>

                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                loading="lazy"
                            />

                            {/* Featured badge (optional) */}
                            <div className="absolute top-3 left-3">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white/85 backdrop-blur border">
                                    ✨ Featured
                                </span>
                            </div>

                            {/* Votes pill */}
                            <div className="absolute top-3 right-3">
                                <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-600 text-white shadow">
                                    👍 {product.votes ?? 0}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                {product.productName}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                                {product.productDesc}
                            </p>

                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {(product.tags || []).slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                                {(product.tags || []).length > 3 && (
                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-50 text-gray-500 border">
                                        +{product.tags.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex items-center justify-between">

                                <button
                                    disabled
                                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
                             bg-gray-100 text-gray-500 cursor-not-allowed"
                                    title="Login to vote"
                                >
                                    Vote
                                </button>

                                <a
                                    href={product.externalLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl
                             bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                    Visit <span className="text-white/90">→</span>
                                </a>
                            </div>
                        </div>

                        {/* bottom accent line */}
                        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 opacity-70" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
