import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import "./tagStyles.css";
import { useForm } from "react-hook-form";
import useSecure from "../hooks/useSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useSecure();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (tags.length === 0) {
            return Swal.fire({
                icon: "warning",
                title: "Tags Required",
                text: "Please add at least one relevant tag before submitting the product.",
                confirmButtonText: "Okay",
                confirmButtonColor: "#4f46e5",
            });
        }

        const tagValues = tags.map(tag => tag.text);
        const productData = {
            ...data,
            tags: tagValues,
            ownerImage: user?.photoURL,
            createdAt: new Date(),
            lastUpdate: new Date(),
            status: "pending",
            votes: parseInt(0),
            voters: []
        }
        axiosSecure.post('/products', productData)
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    setTags([]);
                    Swal.fire({
                        icon: "success",
                        title: "Product Submitted",
                        html: `
                            <p style="font-size:14px; line-height:1.6; color:#6b7280;">
                            Your product has been submitted successfully and is now
                            <strong>pending review</strong>.
                            </p>`,
                        showCancelButton: true,
                        confirmButtonText: "My Products",
                        cancelButtonText: "Add Another Product",
                        confirmButtonColor: "#4f46e5",
                        buttonsStyling: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/dashboard/my-products");
                        }
                    });

                }
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-base-100 p-6 md:p-8 rounded-2xl border border-base-200 shadow-sm">
                <h1 className="text-3xl font-bold mb-2">Submit your Product</h1>
                <p className="text-base-content/60 mb-8">
                    Submit your tech product for review. Once approved by a moderator,
                    it will be visible to the community.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Owner Info */}
                    <div className="mb-8 rounded-2xl border border-base-200 bg-base-200/40 p-5">
                        <h3 className="font-semibold mb-4">Owner Information</h3>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden border border-base-300 bg-base-100">
                                <img
                                    src={user?.photoURL}
                                    alt="Owner"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-base-100"
                                    {...register("ownerName")}
                                />
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    readOnly
                                    className="input input-bordered w-full bg-base-100"
                                    {...register("ownerEmail")}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Product Name */}
                    <div>
                        <label className="block font-medium mb-1">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered w-full"
                            required
                            {...register("productName")}
                        />
                    </div>

                    {/* Product Image */}
                    <div>
                        <label className="block font-medium mb-1">
                            Product Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="https://example.com/image.png"
                            className="input input-bordered w-full"
                            required
                            {...register("productImage")}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Describe what your product does and who it's for"
                            className="textarea textarea-bordered w-full min-h-32.5"
                            required
                            {...register("productDesc")}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block font-medium mb-2">Tags</label>

                        <div className="rounded-xl border border-base-300 bg-base-100 p-3">
                            <ReactTags
                                tags={tags}
                                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                inputFieldPosition="bottom"
                                placeholder="Type a tag and press Enter"
                                reset
                            />
                        </div>

                        <p className="text-sm text-base-content/60 mt-2">
                            Press Enter or comma to add tags. Click ✕ to remove.
                        </p>
                    </div>

                    {/* External Link */}
                    <div>
                        <label className="block font-medium mb-1">External Link</label>
                        <input
                            type="text"
                            placeholder="https://yourproduct.com"
                            className="input input-bordered w-full"
                            {...register("externalLink")}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button className="btn btn-primary w-full rounded-xl">
                            Submit Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
