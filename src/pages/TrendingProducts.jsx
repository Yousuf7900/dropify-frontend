import { Link } from "react-router";
import { FaArrowUp, FaFire } from "react-icons/fa";

const TrendingProducts = () => {
    // DESIGN ONLY (dummy data)
    // Assume these are already "sorted by vote count" (highest first)
    const products = [
        {
            _id: "t1",
            name: "AI Resume Builder Pro",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            tags: ["AI", "Career", "SaaS"],
            votes: 642,
            isOwner: false,
            hasVoted: false,
        },
        {
            _id: "t2",
            name: "Next.js E-commerce Starter",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            tags: ["Code", "Next.js", "Starter"],
            votes: 511,
            isOwner: false,
            hasVoted: true,
        },
        {
            _id: "t3",
            name: "Figma Dashboard UI Kit",
            image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
            tags: ["Design", "Figma", "UI Kit"],
            votes: 466,
            isOwner: true,
            hasVoted: false,
        },
        {
            _id: "t4",
            name: "Notion Finance Tracker",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
            tags: ["Template", "Finance", "Notion"],
            votes: 409,
            isOwner: false,
            hasVoted: false,
        },
        {
            _id: "t5",
            name: "SEO Checklist Bundle",
            image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
            tags: ["Marketing", "SEO", "Docs"],
            votes: 372,
            isOwner: false,
            hasVoted: false,
        },
        {
            _id: "t6",
            name: "Branding Starter Pack",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            tags: ["Brand", "Assets", "Design"],
            votes: 318,
            isOwner: false,
            hasVoted: false,
        },
    ];

    // DESIGN ONLY (dummy click)
    const handleUpvote = () => {
        // later:
        // if not logged in -> navigate('/login')
        // if logged in -> vote +1 (only once)
        // disable for owner
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        <FaFire className="text-orange-500" />
                        Trending Products
                    </h2>
                    <p className="mt-2 text-base-content/70">
                        Most upvoted right now — updated by community votes.
                    </p>
                </div>

                <Link to="/products" className="btn btn-sm md:btn-md rounded-xl btn-ghost">
                    Browse
                </Link>
            </div>

            {/* Cards (6) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product, idx) => {
                    const disabled = product.isOwner || product.hasVoted;

                    return (
                        <div
                            key={product._id}
                            className="group rounded-2xl border border-base-200 bg-base-100 overflow-hidden hover:shadow-lg transition"
                        >
                            {/* image */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-44 w-full object-cover"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />

                                {/* rank badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center rounded-full bg-black/55 text-white px-3 py-1 text-xs font-semibold">
                                        #{idx + 1} Trending
                                    </span>
                                </div>
                            </div>

                            {/* content */}
                            <div className="p-4">
                                {/* name (click to details) */}
                                <Link
                                    to={`/products/${product._id}`}
                                    className="block font-semibold text-lg leading-snug hover:underline underline-offset-4"
                                    title="Go to product details"
                                >
                                    {product.name}
                                </Link>

                                {/* tags */}
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <span key={tag} className="badge badge-ghost badge-sm rounded-lg">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* actions */}
                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <button
                                        onClick={handleUpvote}
                                        disabled={disabled}
                                        className={`btn btn-sm rounded-xl flex-1 ${disabled ? "btn-disabled" : "btn-outline"
                                            }`}
                                        title={
                                            product.isOwner
                                                ? "Owners can't vote on their own product"
                                                : product.hasVoted
                                                    ? "You already voted"
                                                    : "Upvote"
                                        }
                                    >
                                        <FaArrowUp />
                                        {product.votes} Votes
                                    </button>

                                    {/* status pill (design only) */}
                                    {product.isOwner ? (
                                        <span className="text-xs px-3 py-2 rounded-xl bg-base-200/60 text-base-content/70">
                                            Owner
                                        </span>
                                    ) : product.hasVoted ? (
                                        <span className="text-xs px-3 py-2 rounded-xl bg-primary/10 text-primary">
                                            Voted
                                        </span>
                                    ) : (
                                        <span className="text-xs px-3 py-2 rounded-xl bg-base-200/60 text-base-content/70">
                                            Vote
                                        </span>
                                    )}
                                </div>

                                {/* hint (design only) */}
                                <p className="mt-3 text-xs text-base-content/60">
                                    * Login required to vote. One vote per user.
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Show All Products Button */}
            <div className="text-center mt-10">
                <Link to="/products" className="btn btn-primary rounded-xl px-8">
                    Show All Products
                </Link>
            </div>
        </section>
    );
};

export default TrendingProducts;
