import useAuth from "../hooks/useAuth";
import { FaCheckCircle, FaEnvelope, FaCrown } from "react-icons/fa";

const MyProfile = () => {
    const { user } = useAuth();

    const isSubscribed = false;
    const subscriptionAmountText = "$9.99 / month"; 

    const name = user?.displayName || "Unnamed User";
    const email = user?.email || "No email found";
    const photo =
        user?.photoURL || "https://i.pravatar.cc/220?img=32";

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Top banner */}
            <div className="relative overflow-hidden rounded-[28px] border border-base-200 bg-base-100">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />

                <div className="relative p-6 md:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                        {/* Avatar + badge */}
                        <div className="relative shrink-0">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl overflow-hidden border border-base-200 bg-base-200 shadow-sm">
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                />
                            </div>

                            {/* Status chip */}
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                {isSubscribed ? (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-3 py-1 text-xs font-semibold border border-success/20">
                                        <FaCheckCircle className="text-[12px]" />
                                        Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-base-200/70 text-base-content/70 px-3 py-1 text-xs font-semibold border border-base-200">
                                        Free Member
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Identity */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div className="min-w-0">
                                    <h1 className="text-2xl md:text-4xl font-bold tracking-tight line-clamp-1">
                                        {name}
                                    </h1>

                                    <div className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100 px-4 py-2">
                                        <FaEnvelope className="text-base-content/50" />
                                        <p className="text-sm font-medium text-base-content/80 line-clamp-1">
                                            {email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start md:items-end gap-2">
                                    {!isSubscribed ? (
                                        <>
                                            <button className="btn btn-primary rounded-2xl px-6">
                                                <FaCrown />
                                                Subscribe {subscriptionAmountText}
                                            </button>
                                            <p className="text-sm text-base-content/60">
                                                Get Verified membership status.
                                            </p>
                                        </>
                                    ) : (
                                        <div className="rounded-2xl border border-base-200 bg-base-100 px-5 py-4">
                                            <p className="text-sm font-semibold">Membership Subscription</p>
                                            <p className="mt-1 text-sm text-base-content/70 inline-flex items-center gap-2">
                                                <FaCheckCircle className="text-success" />
                                                Status: <span className="font-semibold text-success">Verified</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mt-7 border-t border-base-200" />

                            {/* Quick info grid */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                                    <p className="text-xs text-base-content/60">Account Type</p>
                                    <p className="mt-1 text-lg font-semibold">
                                        {isSubscribed ? "Verified" : "Free"}
                                    </p>
                                    <p className="mt-1 text-sm text-base-content/70">
                                        Membership status
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                                    <p className="text-xs text-base-content/60">Email</p>
                                    <p className="mt-1 text-lg font-semibold line-clamp-1">{email}</p>
                                    <p className="mt-1 text-sm text-base-content/70">
                                        Used for login
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                                    <p className="text-xs text-base-content/60">Benefits</p>
                                    <p className="mt-1 text-lg font-semibold">Premium Access</p>
                                    <p className="mt-1 text-sm text-base-content/70">
                                        Verified badge + perks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 rounded-[28px] border border-base-200 bg-base-100 p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold">Membership</h2>
                            <p className="mt-2 text-sm text-base-content/70">
                                Your membership controls your profile badge and access level.
                            </p>
                        </div>

                        {isSubscribed ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-3 py-1 text-xs font-semibold border border-success/20">
                                <FaCheckCircle className="text-[12px]" />
                                Verified
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-base-200/70 text-base-content/70 px-3 py-1 text-xs font-semibold border border-base-200">
                                Not Subscribed
                            </span>
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-base-200/35 border border-base-200 p-5">
                            <p className="font-semibold">Verified badge</p>
                            <p className="mt-1 text-sm text-base-content/70">
                                Show “Status: Verified” on your profile.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-base-200/35 border border-base-200 p-5">
                            <p className="font-semibold">Premium perks</p>
                            <p className="mt-1 text-sm text-base-content/70">
                                Access membership-only features (you can add later).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Support / Info */}
                <div className="rounded-[28px] border border-base-200 bg-base-100 p-6 md:p-7">
                    <h2 className="text-xl font-bold">Account</h2>
                    <p className="mt-2 text-sm text-base-content/70">
                        Profile info comes from your auth provider.
                    </p>

                    <div className="mt-5 space-y-3">
                        <div className="rounded-2xl border border-base-200 p-4">
                            <p className="text-xs text-base-content/60">Name</p>
                            <p className="mt-1 font-semibold line-clamp-1">{name}</p>
                        </div>

                        <div className="rounded-2xl border border-base-200 p-4">
                            <p className="text-xs text-base-content/60">Email</p>
                            <p className="mt-1 font-semibold line-clamp-1">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
