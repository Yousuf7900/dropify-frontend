import { FaUserCircle, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardOverview = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl border bg-base-100 shadow-sm">
                {/* subtle gradient glow */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />

                <div className="relative p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border bg-base-200">
                                <img
                                    src={user?.photoURL || "https://i.pravatar.cc/150?img=12"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Title */}
                            <div className="min-w-0">
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight truncate">
                                    Welcome back, {user?.displayName || "User"} 👋
                                </h1>
                                <p className="text-sm md:text-base text-base-content/60 mt-1">
                                    Manage your account and products from one place.
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <span className="badge badge-ghost rounded-full">
                                        Dashboard Overview
                                    </span>
                                    <span className="badge badge-outline rounded-full">
                                        Account: Active
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick buttons (no routing logic, just UI) */}
                        <div className="flex flex-wrap gap-3">
                            <button className="btn btn-sm rounded-xl btn-outline">
                                Edit Profile
                            </button>
                            <button className="btn btn-sm rounded-xl btn-primary">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group rounded-3xl border bg-base-100 p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div className="text-3xl text-base-content/70 group-hover:text-primary transition">
                            <FaUserCircle />
                        </div>
                        <span className="badge badge-ghost rounded-full">Profile</span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wide text-base-content/50">
                        Full Name
                    </p>
                    <p className="mt-1 font-semibold text-lg truncate">
                        {user?.displayName || "Not Available"}
                    </p>
                    <p className="mt-2 text-sm text-base-content/60">
                        Keep your profile updated for a better experience.
                    </p>
                </div>

                <div className="group rounded-3xl border bg-base-100 p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div className="text-3xl text-base-content/70 group-hover:text-primary transition">
                            <FaEnvelope />
                        </div>
                        <span className="badge badge-ghost rounded-full">Contact</span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wide text-base-content/50">
                        Email
                    </p>
                    <p className="mt-1 font-semibold text-lg truncate">
                        {user?.email || "Not Available"}
                    </p>
                    <p className="mt-2 text-sm text-base-content/60">
                        We use this email for important notifications.
                    </p>
                </div>

                <div className="group rounded-3xl border bg-base-100 p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                        <div className="text-3xl text-base-content/70 group-hover:text-primary transition">
                            <FaShieldAlt />
                        </div>
                        <span className="badge badge-ghost rounded-full">Status</span>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-wide text-base-content/50">
                        Security
                    </p>
                    <p className="mt-1 font-semibold text-lg text-green-600">
                        Signed In
                    </p>
                    <p className="mt-2 text-sm text-base-content/60">
                        Your session is active. You can manage products securely.
                    </p>
                </div>
            </div>

            {/* Activity / Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-3xl border bg-base-100 p-6 shadow-sm">
                    <h2 className="text-lg font-bold">Quick Tips</h2>
                    <p className="text-sm text-base-content/60 mt-1">
                        A few things you can do right now:
                    </p>

                    <ul className="mt-4 space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary/80" />
                            <p className="text-sm">
                                Add a product with a clear name, image, tags and valid link.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary/80" />
                            <p className="text-sm">
                                Keep your profile photo updated for better trust.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary/80" />
                            <p className="text-sm">
                                Use the sidebar to navigate all dashboard features.
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="rounded-3xl border bg-base-100 p-6 shadow-sm">
                    <h2 className="text-lg font-bold">Next Steps</h2>
                    <p className="text-sm text-base-content/60 mt-1">
                        Suggested actions to complete your setup:
                    </p>

                    <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-2xl border p-4">
                            <div>
                                <p className="font-semibold">Complete profile</p>
                                <p className="text-sm text-base-content/60">
                                    Add photo and correct info
                                </p>
                            </div>
                            <span className="badge badge-outline rounded-full">Recommended</span>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border p-4">
                            <div>
                                <p className="font-semibold">Submit your first product</p>
                                <p className="text-sm text-base-content/60">
                                    Share something valuable
                                </p>
                            </div>
                            <span className="badge badge-ghost rounded-full">Start</span>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border p-4">
                            <div>
                                <p className="font-semibold">Explore products</p>
                                <p className="text-sm text-base-content/60">
                                    Discover what others posted
                                </p>
                            </div>
                            <span className="badge badge-ghost rounded-full">Browse</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
