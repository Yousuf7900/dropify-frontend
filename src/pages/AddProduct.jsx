const AddProduct = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
            <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
            <p className="text-gray-600 mb-8">
                Submit your tech product for review. Once approved by a moderator,
                it will be visible to the community.
            </p>

            <form className="space-y-6">
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
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        placeholder="Describe what your product does and who it's for"
                        className="textarea textarea-bordered w-full min-h-30"
                        required
                    />
                </div>

                {/* Owner Info */}
                <div>
                    <h3 className="font-semibold mb-3">Product Owner Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            value="Owner Name"
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                        <input
                            type="text"
                            value="Owner Email"
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                        <input
                            type="text"
                            value="Owner Image URL"
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-medium mb-1">
                        Tags
                    </label>
                    <input
                        type="text"
                        placeholder="AI, SaaS, Productivity"
                        className="input input-bordered w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Add relevant tags separated by commas
                    </p>
                </div>

                {/* External Link */}
                <div>
                    <label className="block font-medium mb-1">
                        External Link
                    </label>
                    <input
                        type="text"
                        placeholder="https://yourproduct.com"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button className="btn btn-primary w-full rounded-xl">
                        Submit Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
