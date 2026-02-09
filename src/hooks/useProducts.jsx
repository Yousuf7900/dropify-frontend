import { useQuery } from "@tanstack/react-query";
import usePublic from "./usePublic";

const useProducts = () => {
    const axiosPublic = usePublic();
    const { data: products = [], isPending: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    })
    return [products, loading, refetch]
};

export default useProducts;