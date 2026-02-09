import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaHome, FaBoxOpen, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus, } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import Profile from "../pages/Profile";

const NavBar = () => {
    const { user } = useAuth();


    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
            ? "bg-base-200 text-base-content"
            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
        }`;

    const links = (
        <>
            <li>
                <NavLink to={"/"} className={linkClass}>
                    <FaHome className="text-base" />
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to={"/products"} className={linkClass}>
                    <FaBoxOpen className="text-base" />
                    Products
                </NavLink>
            </li>

            <li>
                <NavLink to={"/about"} className={linkClass}>
                    <FaInfoCircle className="text-base" />
                    About
                </NavLink>
            </li>

            <li>
                <NavLink to={"/contact"} className={linkClass}>
                    <FaEnvelope className="text-base" />
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-3 md:px-6">
                {/* LEFT */}
                <div className="navbar-start">
                    {/* Mobile Menu */}
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden rounded-xl"
                            aria-label="Open menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-base-100 p-2 shadow-lg border border-base-200"
                        >
                            {links}
                        </ul>
                    </div>

                    {/* Logo */}
                    <a href="/" className="group inline-flex items-center gap-2 px-1 py-1">
                        <span className="relative text-[19px] font-extrabold tracking-tight text-base-content">
                            Dropify
                            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-base-content opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                        </span>
                    </a>
                </div>

                {/* CENTER */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
                </div>

                {/* RIGHT */}
                {user?.email ? (
                    <div className="navbar-end gap-2">
                        <Profile></Profile>
                    </div>
                ) : (
                    <div className="navbar-end gap-2">
                        <li className="list-none">
                            <NavLink
                                to={"/login"}
                                className={({ isActive }) =>
                                    `btn btn-sm md:btn-md rounded-xl font-semibold normal-case ${isActive ? "btn-neutral" : "btn-ghost hover:bg-base-200"
                                    }`
                                }
                            >
                                <FaSignInAlt />
                                Login
                            </NavLink>
                        </li>

                        <li className="list-none">
                            <NavLink
                                to={"/register"}
                                className="btn btn-sm md:btn-md rounded-xl font-semibold normal-case btn-primary"
                            >
                                <FaUserPlus />
                                Register
                            </NavLink>
                        </li>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
