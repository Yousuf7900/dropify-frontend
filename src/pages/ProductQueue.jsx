import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useSecure from "../hooks/useSecure";

const ProductQueue = () => {
    const axiosSecure = useSecure();

    const [queueProducts, setQueueProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadQueue = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get("/products/review-queue");
            setQueueProducts(res.data || []);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Queue Load Failed",
                text: err?.response?.data?.message || err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQueue();
    }, []);

    const getBadge = (p) => {
        if (p.status === "pending") return "badge badge-warning badge-outline";
        if (p.status === "accepted" && p.featured === false)
            return "badge badge-info badge-outline";
        return "badge badge-outline";
    };

    const getLabel = (p) => {
        if (p.status === "pending") return "Pending";
        if (p.status === "accepted" && p.featured === false)
            return "Accepted (Not Featured)";
        return p.status || "—";
    };

    const handleActionChange = async (e, product) => {
        const action = e.target.value;

        // reset dropdown
        e.target.selectedIndex = 0;

        if (!action) return;

        let payload = null;
        let title = "";
        let text = "";
        let confirmBtn = "";

        if (action === "feature") {
            payload =
                product.status === "pending"
                    ? { status: "accepted", featured: true }
                    : { featured: true };

            title = "Make this product featured?";
            text =
                product.status === "pending"
                    ? "It will be Accepted and Featured together."
                    : "It will be Featured now.";
            confirmBtn = "Yes, Feature";
        }

        if (action === "accept") {
            payload = { status: "accepted" };
            title = "Accept this product?";
            text = "This product will be accepted (not featured).";
            confirmBtn = "Yes, Accept";
        }

        if (action === "reject") {
            payload = { status: "rejected" };
            title = "Reject this product?";
            text = "This product will be rejected.";
            confirmBtn = "Yes, Reject";
        }

        const result = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: confirmBtn,
            cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(
                `/products/status/${product._id}`,
                payload
            );

            if (res.data?.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Product updated successfully.",
                    timer: 1200,
                    showConfirmButton: false,
                });
                loadQueue();
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No changes",
                    text: "Maybe it was already updated.",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: err?.response?.data?.message || err.message,
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Header */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Product Review Queue
                    </h1>
                    <p className="text-base-content/60 mt-1">
                        Showing: Pending + Accepted (Not Featured)
                    </p>
                </div>

                <button
                    onClick={loadQueue}
                    className="btn btn-sm md:btn-md rounded-xl btn-outline"
                >
                    Refresh
                </button>
            </div>

            {/* Table */}
            <div className="mt-6 border border-base-300 rounded-2xl overflow-hidden">
                <div className="bg-base-200/60 px-4 md:px-6 py-4 flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Queue List</h2>
                    <span className="text-sm text-base-content/60">
                        Total: {queueProducts.length}
                    </span>
                </div>

                {loading ? (
                    <div className="p-10 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                        <p className="mt-3 text-base-content/60">Loading queue...</p>
                    </div>
                ) : queueProducts.length ? (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-base-content/70">
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Owner</th>
                                    <th>Votes</th>
                                    <th>Queue Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {queueProducts.map((p, idx) => (
                                    <tr key={p._id} className="hover">
                                        <td className="font-medium">{idx + 1}</td>

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-base-300">
                                                    <img
                                                        src={p.productImage}
                                                        alt={p.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{p.productName}</span>
                                                    <span className="text-xs text-base-content/60">
                                                        {p.createdAt
                                                            ? new Date(p.createdAt).toLocaleString()
                                                            : "—"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{p.ownerName}</span>
                                                <span className="text-sm text-base-content/60">
                                                    {p.ownerEmail}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="badge badge-neutral badge-lg">
                                                {p.votes || 0} votes
                                            </span>
                                        </td>

                                        <td>
                                            <span className={getBadge(p)}>{getLabel(p)}</span>
                                        </td>

                                        <td className="text-right">
                                            <select
                                                defaultValue=""
                                                className="select select-bordered select-sm md:select-md rounded-xl min-w-[220px]"
                                                onChange={(e) => handleActionChange(e, p)}
                                            >
                                                <option value="" disabled>
                                                    Select action
                                                </option>

                                                <option value="feature">Make Featured</option>

                                                {p.status === "pending" && (
                                                    <option value="accept">Accept</option>
                                                )}

                                                {p.status === "pending" && (
                                                    <option value="reject">Reject</option>
                                                )}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-10 text-center">
                        <h3 className="text-xl font-semibold">Queue is empty 🎉</h3>
                        <p className="mt-1 text-base-content/60">
                            No pending products and no accepted-but-not-featured products.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductQueue;
