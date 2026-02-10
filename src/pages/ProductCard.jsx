import { FaArrowUp, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router";

function timeAgoText(isoString) {
    if (!isoString) return "Posted recently";

    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "Posted recently";

    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `Posted ${rtf.format(-seconds, "second")}`;
    if (mins < 60) return `Posted ${rtf.format(-mins, "minute")}`;
    if (hours < 24) return `Posted ${rtf.format(-hours, "hour")}`;
    if (days < 7) return `Posted ${rtf.format(-days, "day")}`;
    if (weeks < 5) return `Posted ${rtf.format(-weeks, "week")}`;
    if (months < 12) return `Posted ${rtf.format(-months, "month")}`;
    return `Posted ${rtf.format(-years, "year")}`;
}

const ProductCard = ({ product }) => {
    const {
        _id,
        productName,
        productImage,
        tags = [],
        votes = 0,
        externalLink,
        createdAt,
    } = product;

    const postedText = timeAgoText(createdAt);

    return (
        <div className="group rounded-2xl border border-base-200 bg-base-100 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative">
                <div className="w-full h-44 bg-base-200 overflow-hidden">
                    <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
                        }}
                    />
                </div>

                {/* readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                {/* Timestamp badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/55 text-white px-3 py-1 text-xs backdrop-blur border border-white/10">
                        <FaClock className="text-[11px]" />
                        {postedText}
                    </span>
                </div>

                {/* External link */}
                {externalLink && (
                    <a
                        href={externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/90 text-base-content px-3 py-1 text-xs font-medium hover:bg-white transition"
                        title="Open external link"
                    >
                        Visit
                        <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Product Name -> Details page */}
                <Link
                    to={`/products/${_id}`}
                    className="block text-[17px] font-semibold leading-snug line-clamp-2 hover:underline underline-offset-4"
                    title="View product details"
                >
                    {productName}
                </Link>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag, i) => (
                        <span key={i} className="badge badge-ghost badge-sm rounded-lg">
                            #{tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="text-xs text-base-content/60">
                            +{tags.length - 4}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between gap-3">
                    <button className="btn btn-sm rounded-xl btn-outline flex-1 gap-2">
                        <FaArrowUp />
                        <span className="font-semibold">{votes}</span>
                        <span className="text-base-content/70">Votes</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
