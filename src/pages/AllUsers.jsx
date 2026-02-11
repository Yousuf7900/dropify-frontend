import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaBan, FaCheckCircle } from "react-icons/fa";
import useSecure from "../hooks/useSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useSecure();

    const handleRole = (userEmail, newRole) => {
        axiosSecure.patch(`/users/${userEmail}`, { role: newRole })
            .then(async (res) => {
                if (res.data.modifiedCount > 0) {
                    await refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Role Updated",
                        timer: 1200,
                        showConfirmButton: false,
                        customClass: {
                            popup: "rounded-2xl shadow-lg"
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Please try again."
                });
            });
    };


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const handleRefresh = () => {
        refetch();
    }
    if (isLoading) {
        return (
            <div className="p-6">
                <div className="bg-base-100 border rounded-2xl p-6 shadow-sm">
                    <p className="font-semibold">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 md:p-6 space-y-5">

            {/* Header */}
            <div className="bg-base-100 border rounded-2xl p-5 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">Manage Users</h1>
                        <p className="text-sm text-base-content/60 mt-1">
                            Total Users: <span className="font-semibold">{users.length}</span>
                        </p>
                    </div>

                    <button onClick={() => handleRefresh} className="btn btn-sm btn-outline rounded-xl">
                        Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 border rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className="bg-base-200/60">
                            <tr>
                                <th className="w-12">SL</th>
                                <th>User</th>
                                <th className="w-36">Role</th>
                                <th className="w-40">Subscription</th>
                                <th className="w-36">Status</th>
                                <th className="w-40 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => {
                                const isBlocked = user?.isBlocked;

                                return (
                                    <tr key={user?._id} className="hover">

                                        {/* SL */}
                                        <td className="font-semibold">{index + 1}</td>

                                        {/* User Info */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full border bg-base-200">
                                                        <img
                                                            src={user?.photoURL}
                                                            alt={user?.name}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold truncate">
                                                        {user?.name}
                                                    </p>
                                                    <p className="text-xs text-base-content/60 truncate">
                                                        {user?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td>
                                            <select
                                                className="select select-bordered select-sm rounded-xl w-full"
                                                defaultValue={user?.role}
                                                onChange={(e) => { handleRole(user.email, e.target.value) }}
                                            >
                                                <option value="user">user</option>
                                                <option value="moderator">moderator</option>
                                                <option value="admin">admin</option>
                                            </select>
                                        </td>

                                        {/* Subscription */}
                                        <td>
                                            {user?.subscription ? (
                                                <span className="badge badge-success badge-outline rounded-full">
                                                    {user?.subscriptionPlan}
                                                </span>
                                            ) : (
                                                <span className="badge badge-ghost rounded-full">
                                                    free
                                                </span>
                                            )}
                                        </td>

                                        {/* Block Status */}
                                        <td>
                                            {isBlocked ? (
                                                <span className="badge badge-error badge-outline rounded-full">
                                                    blocked
                                                </span>
                                            ) : (
                                                <span className="badge badge-info badge-outline rounded-full">
                                                    active
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="text-right">
                                            <div className="flex justify-end gap-2">

                                                <button
                                                    className={`btn btn-sm rounded-xl ${isBlocked ? "btn-success" : "btn-warning"
                                                        }`}
                                                    onClick={() => { }}
                                                >
                                                    {isBlocked ? (
                                                        <span className="inline-flex items-center gap-2">
                                                            <FaCheckCircle /> Unblock
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-2">
                                                            <FaBan /> Block
                                                        </span>
                                                    )}
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-error rounded-xl"
                                                    onClick={() => { }}
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <FaTrashAlt /> Delete
                                                    </span>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                );
                            })}

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-base-content/60">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
};

export default AllUsers;
