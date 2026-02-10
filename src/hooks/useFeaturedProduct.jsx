import { useQuery } from "@tanstack/react-query";
import usePublic from "./usePublic";

const useFeaturedProduct = () => {
    const axiosPublic = usePublic();
    const { data: featured = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products/featured');
            return res.data;
        }
    });
    return [featured, loading, refetch];
};

export default useFeaturedProduct;