import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <>
            <nav>
                <NavBar></NavBar>
            </nav>
            <section>
                <Outlet></Outlet>
            </section>
            <footer>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default MainLayout;