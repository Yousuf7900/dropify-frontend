import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { FaSignOutAlt, FaTachometerAlt, FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    if (!user?.email) return null;

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

    return (
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                {/* Avatar with tooltip */}
                <div
                    className="tooltip tooltip-bottom"
                    data-tip={user?.displayName || "User"}
                >
                    <button
                        tabIndex={0}
                        aria-label="Open profile menu"
                        className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition"
                    >
                        <div className="w-11 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200 flex items-center justify-center">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="text-3xl text-base-content/40" />
                            )}
                        </div>
                    </button>
                </div>

                {/* Dropdown panel */}
                <div
                    tabIndex={0}
                    className="dropdown-content mt-3 w-80 rounded-2xl bg-base-100 shadow-2xl border border-base-200 overflow-hidden z-999"
                >
                    {/* Header */}
                    <div className="px-4 py-4 bg-base-200/60">
                        <div className="flex flex-col items-center gap-3 text-center">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-base-100 border border-base-200 shadow-sm flex items-center justify-center">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-4xl text-base-content/40" />
                                    )}
                                </div>

                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-base-100"></span>
                            </div>

                            {/* User Info */}
                            <div className="min-w-0">
                                <p className="font-semibold text-sm leading-tight truncate">
                                    {user?.displayName || "User"}
                                </p>

                                <p className="text-xs text-base-content/60 truncate">
                                    {user?.email}
                                </p>

                                <p className="mt-1 inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">
                                    General Member
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Menu */}
                    <div className="p-2">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-base-200 transition"
                        >
                            <span className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                                <FaTachometerAlt className="text-base-content/70" />
                            </span>
                            <div className="leading-tight">
                                <p className="font-medium">Dashboard</p>
                                <p className="text-xs text-base-content/60">
                                    Manage products & profile
                                </p>
                            </div>
                        </Link>

                        <div className="divider my-2"></div>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-50 transition"
                        >
                            <span className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <FaSignOutAlt className="text-red-600" />
                            </span>
                            <div className="leading-tight text-left">
                                <p className="font-medium text-red-600">Logout</p>
                                <p className="text-xs text-red-500/80">
                                    Sign out of your account
                                </p>
                            </div>
                        </button>
                    </div>

                    <div className="px-4 py-3 text-xs text-base-content/50 bg-base-200/40">
                        ✨ Use Dashboard to add products & manage submissions.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
