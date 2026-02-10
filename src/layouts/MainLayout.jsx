import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            
            <main className="flex-1 pt-16 md:pt-20">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Outlet />
                </div>
            </main>

            <footer className="w-full">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Footer />
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
