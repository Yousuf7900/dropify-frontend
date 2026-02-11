import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import useSecure from "../hooks/useSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useSecure();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["my-products", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${user?.email}`);
            return res.data;
        },
    });

    // delete product
    const handleDelete = (id, productName) => {
        Swal.fire({
            title: "Delete Product?",
            html: `<p class="text-sm text-gray-500 mt-1"> You are about to permanently delete <strong>${productName}</strong>.</p><p class="text-xs text-gray-400 mt-2">cannot be undone.</p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
            focusCancel: true,
            background: "#ffffff",
            borderRadius: "16px",
            customClass: {
                popup: "rounded-2xl shadow-lg",
                confirmButton: "px-5 py-2 rounded-lg font-medium",
                cancelButton: "px-5 py-2 rounded-lg font-medium"
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/products/${id}`);
                    if (res.data?.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted Successfully",
                            text: "The product has been removed from your account.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                            background: "#ffffff",
                            borderRadius: "16px"
                        });
                        await refetch();
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: "Something went wrong",
                        text: "Please try again later.",
                        icon: "error",
                        confirmButtonColor: "#2563eb",
                        borderRadius: "16px"
                    });
                }
            }
        });
    };



    const formatDate = (iso) => {
        if (!iso) return "—";
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return "—";
        }
    };

    const getStatusPill = (status) => {
        const s = (status || "").toLowerCase();
        if (s === "accepted" || s === "approved") {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-green-200 bg-green-50 text-green-700">
                    Approved
                </span>
            );
        }
        if (s === "pending") {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-amber-200 bg-amber-50 text-amber-700">
                    Pending
                </span>
            );
        }
        if (s === "rejected") {
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-red-200 bg-red-50 text-red-700">
                    Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-base-300 bg-base-200/40 text-base-content/70">
                {status || "Unknown"}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="p-2 md:p-6">
                <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
                    <p className="font-semibold">Loading your products...</p>
                    <p className="text-sm text-base-content/60 mt-1">Please wait a moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6 space-y-5">
            {/* Header */}
            <div className="bg-base-100 border rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">My Products</h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Manage your submissions — update details or remove products.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-sm border bg-base-200/50">
                            Total: <span className="font-semibold">{products.length}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-base-100 border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-base-200/60">
                            <tr className="text-[12px] uppercase tracking-wide text-base-content/60">
                                <th className="w-14">SL</th>
                                <th>Product</th>
                                <th className="w-32">Status</th>
                                <th className="w-24 text-right">Votes</th>
                                <th className="w-56">Posted</th>
                                <th className="w-56">Updated</th>
                                <th className="w-44 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p, idx) => (
                                <tr key={p?._id} className="hover:bg-base-200/30 transition">
                                    {/* SL */}
                                    <td className="font-semibold text-base-content/70">{idx + 1}</td>

                                    {/* Product */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border bg-base-200 shrink-0">
                                                <img
                                                    src={p?.productImage}
                                                    alt={p?.productName}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="font-semibold truncate">{p?.productName}</p>
                                                <p className="text-xs text-base-content/60 truncate max-w-95">
                                                    {p?.productDesc}
                                                </p>

                                                {/* Tags */}
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {(p?.tags || []).slice(0, 3).map((tag, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-0.5 rounded-full text-[11px] border bg-base-200/40 text-base-content/70"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {(p?.tags || []).length > 3 && (
                                                        <span className="text-[11px] text-base-content/50">
                                                            +{p.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td>{getStatusPill(p?.status)}</td>

                                    {/* Votes */}
                                    <td className="text-right">
                                        <span className="font-semibold">{p?.votes ?? 0}</span>
                                    </td>

                                    {/* Posted */}
                                    <td>
                                        <p className="text-sm font-medium">{formatDate(p?.createdAt)}</p>
                                        <p className="text-xs text-base-content/50">Created</p>
                                    </td>

                                    {/* Updated */}
                                    <td>
                                        <p className="text-sm font-medium">{formatDate(p?.lastUpdate)}</p>
                                        <p className="text-xs text-base-content/50">Last update</p>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <a
                                                href={p?.externalLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-sm btn-ghost rounded-xl"
                                                title="Open link"
                                            >
                                                <FaExternalLinkAlt />
                                            </a>

                                            <button
                                                className="btn btn-sm btn-outline rounded-xl"
                                                onClick={() => { }}
                                                title="Update"
                                            >
                                                <FaEdit />
                                                <span className="hidden md:inline">Update</span>
                                            </button>

                                            <button
                                                className="btn btn-sm btn-outline rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(p?._id, p.productName)}
                                                title="Delete"
                                            >
                                                <FaTrashAlt />
                                                <span className="hidden md:inline">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-base-content/60">
                                        You haven’t added any products yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Note */}
                <div className="px-5 py-3 border-t bg-base-100">
                    <p className="text-xs text-base-content/60">
                        Tip: Approved products are visible publicly. Pending products are under review.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MyProducts;
