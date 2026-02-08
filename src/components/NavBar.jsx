import { NavLink } from "react-router";

const NavBar = () => {
    const links = (
        <>
            <li>
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                            ? "bg-base-200 text-base-content"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink
                    to={"/products"}
                    className={({ isActive }) =>
                        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                            ? "bg-base-200 text-base-content"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                    }
                >
                    Products
                </NavLink>
            </li>

            <li>
                <NavLink
                    to={"/about"}
                    className={({ isActive }) =>
                        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                            ? "bg-base-200 text-base-content"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                    }
                >
                    About
                </NavLink>
            </li>

            <li>
                <NavLink
                    to={"/contact"}
                    className={({ isActive }) =>
                        `rounded-lg px-3 py-2 text-sm font-medium transition ${isActive
                            ? "bg-base-200 text-base-content"
                            : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                        }`
                    }
                >
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-3 md:px-6">
                <div className="navbar-start">
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

                    <a href="/" className="group inline-flex items-center gap-2 px-1 py-1">
                        <span className="relative text-[19px] font-extrabold tracking-tight text-base-content">
                            Dropify
                            <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-base-content opacity-40 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                        </span>
                    </a>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
                </div>

                <div className="navbar-end gap-2">
                    <li className="list-none">
                        <NavLink
                            to={"/login"}
                            className={({ isActive }) =>
                                `btn btn-sm md:btn-md rounded-xl font-semibold normal-case ${isActive ? "btn-neutral" : "btn-ghost hover:bg-base-200"
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    </li>

                    <li className="list-none">
                        <NavLink
                            to={"/register"}
                            className={({ isActive }) =>
                                `btn btn-sm md:btn-md rounded-xl font-semibold normal-case ${isActive ? "btn-primary" : "btn-primary"
                                }`
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
