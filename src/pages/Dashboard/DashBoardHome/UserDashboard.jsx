import { NavLink } from "react-router";
import {
    FaHome,
    FaBoxOpen,
    FaPlus,
    FaChartLine,
    FaReceipt,
    FaArrowRight,
    FaCheckCircle,
    FaHourglassHalf,
    FaFire,
    FaClock,
} from "react-icons/fa";

const UserDashboard = () => {
    // card button styles (active + hover)
    const cardClass = ({ isActive }) =>
        `group relative overflow-hidden rounded-3xl border bg-base-100 p-6 transition
     hover:-translate-y-0.5 hover:shadow-lg
     ${isActive ? "border-primary/40 ring-1 ring-primary/25" : "border-base-200"}`;

    const iconClass = ({ isActive }) =>
        `h-12 w-12 rounded-2xl flex items-center justify-center border transition
     ${isActive
            ? "bg-primary/15 text-primary border-primary/20"
            : "bg-base-200/50 text-base-content/70 border-base-200 group-hover:bg-base-200"}`;

    const arrowClass =
        "absolute right-6 top-1/2 -translate-y-1/2 text-base-content/40 transition group-hover:translate-x-1 group-hover:text-base-content/70";

    // Design-only numbers (replace later)
    const stats = [
        { label: "My Products", value: "—", icon: <FaBoxOpen /> },
        { label: "Approved", value: "—", icon: <FaCheckCircle /> },
        { label: "Pending", value: "—", icon: <FaHourglassHalf /> },
        { label: "Total Votes", value: "—", icon: <FaFire /> },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* HERO / HEADER */}
            <div className="relative overflow-hidden rounded-[28px] border border-base-200 bg-base-100">
                {/* decorative */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

                <div className="relative p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                            <p className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-base-200/50 text-base-content/70 border border-base-200">
                                <FaChartLine className="text-xs" />
                                Dashboard
                            </p>

                            <h1 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight">
                                Welcome back 👋
                            </h1>
                            <p className="mt-2 text-base-content/70 max-w-2xl">
                                Manage your products, track approvals, and see vote performance — all in one place.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <NavLink
                                to="/dashboard/add-product"
                                className="btn btn-primary rounded-2xl"
                            >
                                <FaPlus />
                                Add Product
                            </NavLink>

                            <NavLink
                                to="/products"
                                className="btn btn-ghost rounded-2xl border border-base-200"
                            >
                                Browse Products
                                <FaArrowRight />
                            </NavLink>
                        </div>
                    </div>

                    {/* STATS GRID */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-base-200 bg-base-100 p-4 hover:shadow-sm transition"
                            >
                                <div className="flex items-start justify-between">
                                    <p className="text-sm text-base-content/60">{s.label}</p>
                                    <span className="text-base-content/50">{s.icon}</span>
                                </div>
                                <p className="text-2xl font-bold mt-2">{s.value}</p>
                                <p className="text-xs text-base-content/50 mt-1">This month</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="space-y-4">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">Quick Actions</h2>
                        <p className="text-sm text-base-content/70 mt-1">
                            Jump to the most-used pages. These are your dashboard shortcuts.
                        </p>
                    </div>

                    <span className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-base-200/40 text-base-content/70 border border-base-200">
                        Tip: Use the cards like buttons
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* My Dashboard */}
                    <NavLink to="/dashboard/user-overview" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaChartLine />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">My Dashboard</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Overview, status summary, and quick insights.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>

                    {/* Add Product */}
                    <NavLink to="/dashboard/add-product" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaPlus />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">Add Product</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Submit a new digital product for review.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>

                    {/* My Products */}
                    <NavLink to="/dashboard/my-products" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaBoxOpen />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">My Products</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Edit, delete, track votes, and see approval status.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>

                    {/* Subscriptions */}
                    <NavLink to="/dashboard/orders" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaReceipt />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">My Subscriptions</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    View plans, billing, and subscription history.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>

                    {/* Home */}
                    <NavLink to="/" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaHome />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">Home</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Return to the homepage anytime.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>

                    {/* Browse */}
                    <NavLink to="/products" className={cardClass}>
                        <div className="flex items-start gap-4">
                            <div className={iconClass}>
                                <FaFire />
                            </div>

                            <div className="min-w-0 pr-10">
                                <h3 className="text-lg font-semibold">Browse Products</h3>
                                <p className="mt-1 text-sm text-base-content/70">
                                    Explore trending and featured digital products.
                                </p>
                            </div>
                        </div>

                        <FaArrowRight className={arrowClass} />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0 opacity-0 group-hover:opacity-100 transition" />
                    </NavLink>
                </div>
            </div>

            {/* SECONDARY PANEL (design-only) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-3xl border border-base-200 bg-base-100 p-6">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                        Your latest submissions & updates will appear here. (Design only)
                    </p>

                    <div className="mt-5 space-y-3">
                        {[1, 2, 3].map((x) => (
                            <div
                                key={x}
                                className="rounded-2xl border border-base-200 p-4 flex items-start justify-between gap-4 hover:bg-base-200/20 transition"
                            >
                                <div className="min-w-0">
                                    <p className="font-semibold line-clamp-1">Activity item #{x}</p>
                                    <p className="text-sm text-base-content/70 mt-1 line-clamp-2">
                                        Example: “Your product was reviewed”, “Votes increased”, “Status updated”.
                                    </p>
                                </div>
                                <span className="text-xs text-base-content/60 inline-flex items-center gap-2">
                                    <FaClock className="text-[10px]" />
                                    Just now
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-base-200 bg-base-100 p-6">
                    <h3 className="text-lg font-semibold">Helpful Shortcuts</h3>
                    <p className="text-sm text-base-content/70 mt-1">
                        Quick reminders to keep your products strong.
                    </p>

                    <div className="mt-5 space-y-3">
                        <div className="rounded-2xl bg-base-200/40 p-4">
                            <p className="font-semibold">Improve your listing</p>
                            <p className="text-sm text-base-content/70 mt-1">
                                Add clean screenshots and clear tags for better discovery.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-base-200/40 p-4">
                            <p className="font-semibold">Get more votes</p>
                            <p className="text-sm text-base-content/70 mt-1">
                                Share your product page link and ask for honest feedback.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-base-200/40 p-4">
                            <p className="font-semibold">Stay updated</p>
                            <p className="text-sm text-base-content/70 mt-1">
                                Check “My Products” to track status and performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
