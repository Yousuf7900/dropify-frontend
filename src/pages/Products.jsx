import { Helmet } from "react-helmet-async";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products] = useProducts();

    return (
        <div className="max-w-7xl mx-auto px-4">
            <Helmet>
                <title>Dropify | Products</title>
            </Helmet>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">All Products</h1>
                <p className="text-sm text-base-content/60">
                    Discover and explore the latest tech products on Dropify
                </p>
            </div>

            <p className="mb-6 text-sm">
                Total Products:{" "}
                <span className="font-semibold">{products.length}</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
