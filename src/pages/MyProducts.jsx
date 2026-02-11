import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import "./tagStyles.css";
import useSecure from "../hooks/useSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const MyProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useSecure();

    const { register, handleSubmit, reset } = useForm();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editTags, setEditTags] = useState([]);

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ["my-products", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products/${user?.email}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (selectedProduct) {
            reset({
                productName: selectedProduct?.productName || "",
                productImage: selectedProduct?.productImage || "",
                productDesc: selectedProduct?.productDesc || "",
                externalLink: selectedProduct?.externalLink || "",
            });

            setEditTags((selectedProduct?.tags || []).map((t) => ({ id: t, text: t })));
        }
    }, [selectedProduct, reset]);

    // delete product
    const handleDelete = (id, productName) => {
        Swal.fire({
            title: "Delete Product?",
            html: `<p class="text-sm text-gray-500 mt-1">You are about to permanently delete <strong>${productName}</strong>.</p><p class="text-xs text-gray-400 mt-2">This action cannot be undone.</p>`,
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
                cancelButton: "px-5 py-2 rounded-lg font-medium",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/products/${id}`)
                    .then(async (res) => {
                        if (res.data?.deletedCount > 0) {
                            await refetch();
                            Swal.fire({
                                title: "Deleted Successfully",
                                text: "The product has been removed from your account.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                                background: "#ffffff",
                                borderRadius: "16px",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Something went wrong",
                            text: "Please try again later.",
                            icon: "error",
                            confirmButtonColor: "#2563eb",
                            borderRadius: "16px",
                        });
                    });
            }
        });
    };

    // open update modal
    const handleUpdate = (product) => {
        setSelectedProduct(product);
        document.getElementById("updateProductModal")?.showModal();
    };


    const handleEditTagAdd = (tag) => {
        setEditTags([...editTags, tag]);
    };

    const handleEditTagDelete = (index) => {
        setEditTags(editTags.filter((_, i) => i !== index));
    };

    // update submit
    const onSubmit = (data) => {
        if (!selectedProduct?._id) return;

        if (editTags.length === 0) {
            return Swal.fire({
                icon: "warning",
                title: "Tags Required",
                text: "Please add at least one tag before updating.",
                confirmButtonText: "Okay",
                confirmButtonColor: "#4f46e5",
            });
        }

        const tagValues = editTags.map((t) => t.text);

        const updatedData = {
            ...data,
            tags: tagValues,
            lastUpdate: new Date(),
        };

        axiosSecure.patch(`/products/${selectedProduct?._id}`, updatedData)
            .then(async (res) => {
                if (res.data?.modifiedCount > 0) {
                    await refetch();
                    document.getElementById("updateProductModal")?.close();

                    Swal.fire({
                        title: "Updated!",
                        text: "Your product has been updated successfully.",
                        icon: "success",
                        timer: 1400,
                        showConfirmButton: false,
                        background: "#ffffff",
                        customClass: {
                            popup: "rounded-2xl shadow-lg"
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "No changes",
                        text: "Nothing was updated. Try changing some fields.",
                        confirmButtonColor: "#4f46e5",
                        borderRadius: "16px",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: "Please try again.",
                    confirmButtonColor: "#2563eb",
                    borderRadius: "16px",
                });
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
            {/* ✅ Update Modal */}
            <dialog id="updateProductModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-0 rounded-2xl max-w-3xl">
                    {/* Header */}
                    <div className="px-6 py-5 border-b bg-base-100 rounded-t-2xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Update Product</h3>
                                <p className="text-sm text-base-content/60 mt-1">
                                    Edit your product details and save changes.
                                </p>
                            </div>

                            <form method="dialog">
                                <button className="btn btn-sm btn-ghost rounded-xl">✕</button>
                            </form>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-6 space-y-6 bg-base-100">
                        {/* Preview */}
                        <div className="flex items-center gap-4 rounded-2xl border bg-base-200/30 p-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden border bg-base-200 shrink-0">
                                <img
                                    src={
                                        selectedProduct?.productImage ||
                                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                                    }
                                    alt="preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold truncate">{selectedProduct?.productName || "Product name"}</p>
                                <p className="text-xs text-base-content/60 truncate">{selectedProduct?.externalLink || "External link"}</p>
                            </div>

                            <div className="ml-auto">
                                <span className="badge badge-ghost rounded-full">
                                    Status: {selectedProduct?.status || "—"}
                                </span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Product Name */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Product Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter product name"
                                    className="input input-bordered w-full rounded-xl"
                                    {...register("productName", { required: true })}
                                />
                            </div>

                            {/* Image + Link */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium mb-1">
                                        Product Image URL <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/image.png"
                                        className="input input-bordered w-full rounded-xl"
                                        {...register("productImage", { required: true })}
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium mb-1">External Link</label>
                                    <input
                                        type="text"
                                        placeholder="https://yourproduct.com"
                                        className="input input-bordered w-full rounded-xl"
                                        {...register("externalLink")}
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block font-medium mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    placeholder="Describe what your product does and who it's for"
                                    className="textarea textarea-bordered w-full rounded-xl min-h-32"
                                    {...register("productDesc", { required: true })}
                                />
                                <p className="text-xs text-base-content/50 mt-2">
                                    Keep it short, clear, and user-focused.
                                </p>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block font-medium mb-2">Tags</label>
                                <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                                    <ReactTags
                                        tags={editTags}
                                        separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                                        handleDelete={handleEditTagDelete}
                                        handleAddition={handleEditTagAdd}
                                        inputFieldPosition="bottom"
                                        placeholder="Type a tag and press Enter"
                                        reset
                                    />
                                </div>
                                <p className="text-sm text-base-content/60 mt-2">
                                    Press Enter or comma to add tags. Click ✕ to remove.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <form method="dialog">
                                    <button className="btn btn-outline rounded-xl w-full sm:w-auto">
                                        Cancel
                                    </button>
                                </form>

                                <button type="submit" className="btn btn-primary rounded-xl w-full sm:w-auto">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

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

            {/* Table */}
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
                                    <td className="font-semibold text-base-content/70">{idx + 1}</td>

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

                                    <td>{getStatusPill(p?.status)}</td>

                                    <td className="text-right">
                                        <span className="font-semibold">{p?.votes ?? 0}</span>
                                    </td>

                                    <td>
                                        <p className="text-sm font-medium">{formatDate(p?.createdAt)}</p>
                                        <p className="text-xs text-base-content/50">Created</p>
                                    </td>

                                    <td>
                                        <p className="text-sm font-medium">{formatDate(p?.lastUpdate)}</p>
                                        <p className="text-xs text-base-content/50">Last update</p>
                                    </td>

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
                                                onClick={() => handleUpdate(p)}
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
