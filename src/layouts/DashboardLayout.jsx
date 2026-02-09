import { NavLink, Outlet, useNavigate } from "react-router";
import { FaHome, FaBoxOpen, FaPlusCircle, FaListAlt, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `rounded-xl px-3 py-2 transition flex items-center gap-3 ${isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
        }`;

    const handleLogout = () => {
        logOut().then(() => navigate("/"));
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Content Area */}
            <div className="drawer-content flex flex-col">
                {/* Top Navbar */}
                <nav className="navbar w-full bg-base-100 border-b border-base-200 px-4">
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-ghost btn-square lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <aside className="w-72 min-h-full bg-base-100 border-r border-base-200 p-3">
                    {/* Brand */}
                    <div className="px-3 py-4 border-b border-base-200">
                        <p className="font-bold text-xl">Dropify</p>
                        <p className="text-xs text-base-content/60">Dashboard Menu</p>
                    </div>

                    {/* ✅ Profile (moved to top) */}
                    <div className="px-3 pt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-base-content/50 mb-2">
                            Profile Info
                        </p>

                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-base-200/60">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-base-300 bg-base-100">
                                <img
                                    src={user?.photoURL}
                                    alt="User profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium text-base-content truncate">
                                    {user?.displayName || "User"}
                                </p>
                                <p className="text-xs text-base-content/60 truncate">
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divider my-3"></div>

                    {/* Menu Links */}
                    <ul className="menu gap-1">
                        {/* Common */}
                        <li>
                            <NavLink to="/" className={linkClass}>
                                <FaHome className="text-base-content/70" />
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/products" className={linkClass}>
                                <FaBoxOpen className="text-base-content/70" />
                                Products
                            </NavLink>
                        </li>

                        <div className="divider my-2"></div>

                        {/* User links */}
                        <li>
                            <NavLink to="/dashboard/add-product" className={linkClass}>
                                <FaPlusCircle className="text-base-content/70" />
                                Add Product
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/my-products" className={linkClass}>
                                <FaListAlt className="text-base-content/70" />
                                My Products
                            </NavLink>
                        </li>

                        <div className="divider my-2"></div>

                        {/* Logout */}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="rounded-xl px-3 py-2 transition flex items-center gap-3 hover:bg-red-50 text-red-600 w-full"
                            >
                                <FaSignOutAlt className="text-red-600" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
