import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useSecure from "../hooks/useSecure";
import { FaEdit, FaTrashAlt, FaArrowUp, FaClock, FaPlus } from "react-icons/fa";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useSecure();
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/products/${user.email}`).then((res) => {
            setMyProducts(res.data || []);
        });
    }, [axiosSecure, user?.email]);

    const stats = useMemo(() => {
        const total = myProducts.length;
        const approved = myProducts.filter((p) => p?.status === "approved").length;
        const pending = myProducts.filter((p) => p?.status === "pending").length;
        const totalVotes = myProducts.reduce((sum, p) => sum + (p?.votes || 0), 0);
        return { total, approved, pending, totalVotes };
    }, [myProducts]);

    const StatusBadge = ({ status }) => {
        const s = (status || "").toLowerCase();
        const map = {
            approved: "badge-success",
            pending: "badge-warning",
            rejected: "badge-error",
        };
        return (
            <span className={`badge badge-sm rounded-lg capitalize ${map[s] || "badge-ghost"}`}>
                {s || "unknown"}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">My Products</h1>
                    <p className="mt-2 text-base-content/70">
                        Track your submissions, monitor status, and manage your products.
                    </p>
                </div>

                <Link to="/dashboard/add-product" className="btn btn-primary rounded-xl">
                    <FaPlus />
                    Add Product
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">Total</p>
                    <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">Approved</p>
                    <p className="text-2xl font-bold mt-1">{stats.approved}</p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">Pending</p>
                    <p className="text-2xl font-bold mt-1">{stats.pending}</p>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-100 p-4">
                    <p className="text-sm text-base-content/60">Total Votes</p>
                    <p className="text-2xl font-bold mt-1">{stats.totalVotes}</p>
                </div>
            </div>

            {/* Table wrapper */}
            <div className="rounded-2xl border border-base-200 bg-base-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="bg-base-200/40">
                                <th className="w-14">SL</th>
                                <th className="min-w-70">Name</th>
                                <th className="w-28">Status</th>
                                <th className="min-w-55">Added Time</th>
                                <th className="w-32 text-center">Votes</th>
                                <th className="w-44 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {myProducts.map((p, idx) => (
                                <tr key={p?._id || idx} className="hover">
                                    {/* SL */}
                                    <td className="font-semibold text-base-content/70">{idx + 1}</td>

                                    {/* Name + image + tags */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-base-200 shrink-0">
                                                <img
                                                    src={p.productImage}
                                                    alt={p.productName}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="font-semibold leading-tight line-clamp-1">
                                                    {p.productName}
                                                </h3>

                                                <div className="mt-1 flex flex-wrap items-center gap-1">
                                                    {(p.tags || []).slice(0, 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-[11px] px-2 py-0.5 rounded-full bg-base-200 text-base-content/70"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {(p.tags || []).length > 3 && (
                                                        <span className="text-xs text-base-content/60">
                                                            +{(p.tags || []).length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-base-content/60 mt-1 line-clamp-1">
                                                    {p.externalLink ? (
                                                        <span className="font-mono">{p.externalLink}</span>
                                                    ) : (
                                                        <span className="font-mono">
                                                            ID: {String(p?._id).slice(0, 10)}…
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td>
                                        <StatusBadge status={p.status} />
                                    </td>

                                    {/* Added time */}
                                    <td>
                                        <div className="inline-flex items-center gap-2 text-sm text-base-content/70">
                                            <FaClock className="text-xs" />
                                            <span className="font-mono">
                                                {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Votes */}
                                    <td className="text-center">
                                        <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-base-200/50 text-sm font-semibold">
                                            <FaArrowUp className="text-sm" />
                                            {p.votes ?? 0}
                                        </span>
                                    </td>

                                    {/* Actions (design only) */}
                                    <td>
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="btn btn-sm rounded-xl btn-outline" title="Edit">
                                                <FaEdit />
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm rounded-xl btn-outline btn-error"
                                                title="Delete"
                                            >
                                                <FaTrashAlt />
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty state */}
                            {myProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-12">
                                        <div className="text-center">
                                            <p className="font-semibold text-lg">No products found</p>
                                            <p className="text-sm text-base-content/60 mt-2">
                                                Add your first product to see it here.
                                            </p>
                                            <Link
                                                to="/dashboard/add-product"
                                                className="btn btn-primary rounded-xl mt-5"
                                            >
                                                <FaPlus />
                                                Add Product
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
