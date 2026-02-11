import { NavLink, Outlet, useNavigate } from "react-router";
import { FaHome, FaBoxOpen, FaSignOutAlt, FaUser } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useSecure from "../hooks/useSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [userRole, setRole] = useState('');

    const axiosSecure = useSecure();
    useEffect(() => {

        if (!user?.email) {
            return;
        }
        const token = localStorage.getItem('access-token');
        if (!token) {
            return;
        }

        axiosSecure.get(`/users/${user.email}`)
            .then(res => {
                setRole(res.data.role);
            })
            .catch(err => {
                console.log(err.response.status);
            })

    }, [user?.email, axiosSecure])
    console.log(userRole);

    const role = userRole || "user";
    const isAdmin = role === "admin";
    const isModerator = role === "moderator";

    const linkClass = ({ isActive }) =>
        `rounded-xl px-3 py-2 transition flex items-center gap-3 ${isActive ? "bg-base-300 font-semibold" : "hover:bg-base-200"
        }`;

    const handleLogout = () => {
        Swal.fire({
            title: "Log out of Dropify?",
            text: "You’ll need to sign in again to access your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Stay logged in",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged out",
                            text: "You’ve been safely signed out.",
                            icon: "success",
                            timer: 1200,
                            showConfirmButton: false,
                        });
                        navigate("/");
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Logout failed",
                            text: "Please try again.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    const commonLinks = (
        <>
            <li>
                <NavLink to="/" className={linkClass}>
                    <FaHome className="text-base-content/70" />
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/products" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Browse Products
                </NavLink>
            </li>
        </>
    );

    const adminLinks = (
        <>
            <li>
                <NavLink to="/dashboard" className={linkClass}>
                    <FaHome className="text-base-content/70" />
                    Admin Overview
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/admin-stats" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Statistics
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-users" className={linkClass}>
                    <FaUser className="text-base-content/70" />
                    Manage Users
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/manage-coupons" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Manage Coupons
                </NavLink>
            </li>
        </>
    );

    const moderatorLinks = (
        <>
            <li>
                <NavLink to="/dashboard" className={linkClass}>
                    <FaHome className="text-base-content/70" />
                    Moderator Overview
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/product-queue" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Product Queue
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/reported-content" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Reported Contents
                </NavLink>
            </li>
        </>
    );

    const userLinks = (
        <>
            <li>
                <NavLink to="/dashboard/" className={linkClass}>
                    <FaHome className="text-base-content/70" />
                    My Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-profile" className={linkClass}>
                    <FaUser className="text-base-content/70" />
                    My Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/add-products" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    Add Product
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-products" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    My Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/orders" className={linkClass}>
                    <FaBoxOpen className="text-base-content/70" />
                    My Subscriptions
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            {/* Content */}
            <div className="drawer-content flex flex-col">
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

                        <p className="font-bold text-lg">Dashboard</p>
                    </div>
                </nav>

                <div className="p-4 md:p-6">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay" />

                <aside className="w-72 min-h-full bg-base-100 border-r border-base-200 p-3">
                    {/* Brand */}
                    <div className="px-3 py-4 border-b border-base-200">
                        <p className="font-bold text-xl">Dropify</p>
                        <p className="text-xs text-base-content/60 capitalize">{role} menu</p>
                    </div>

                    {/* Profile */}
                    <div className="px-3 pt-4">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-base-200/60">
                            <div className="w-9 h-9 rounded-full overflow-hidden border border-base-300 bg-base-100">
                                <img
                                    src={user?.photoURL}
                                    alt="User profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user?.displayName || "User"}
                                </p>
                                <p className="text-xs text-base-content/60 truncate">
                                    {user?.email || ""}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divider my-3" />

                    <ul className="menu gap-1">
                        {commonLinks}

                        <div className="divider my-2" />

                        {/* Role-based menu */}
                        {isAdmin ? adminLinks : isModerator ? moderatorLinks : userLinks}

                        <div className="divider my-2" />

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