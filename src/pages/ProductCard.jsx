import { FaArrowUp, FaExternalLinkAlt } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const {
        name,
        image,
        tags = [],
        votes,
        externalLink,
    } = product;

    return (
        <div className="border border-base-200 rounded-2xl p-4 bg-base-100 hover:shadow-md transition">

            <div className="w-full h-40 rounded-xl overflow-hidden bg-base-200">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-4 space-y-2">

                <h3 className="text-lg font-semibold leading-tight line-clamp-1">
                    {name}
                </h3>
                <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="text-[11px] px-2 py-[2px] rounded-full bg-base-200 text-base-content/70"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-between">

                    <button
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-base-300 hover:bg-base-200 transition text-sm"
                    >
                        <FaArrowUp />
                        <span>{votes}</span>
                    </button>
                    {externalLink && (
                        <a
                            href={externalLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                            Visit
                            <FaExternalLinkAlt className="text-xs" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
