import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Dropify | Home</title>
            </Helmet>
            
            <h1>Hello from Home</h1>
        </div>
    );
};

export default Home;