import { Plus, Pencil, Trash2, ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const UsersTable = ({ onAddForm, onEditUser, onDeleteUser, data, currentPage, totalPages, totalRecords, pageSize, onPageChange, onSearch }) => {

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const sortedUsers = !sortConfig.key ? data : [...data].sort((a, b) => {

        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        if (typeof valueA === "boolean") {
            valueA = valueA ? 1 : 0;
            valueB = valueB ? 1 : 0;
        }

        if (typeof valueA === "number") {
            return sortConfig.direction === "asc"
                ? valueA - valueB
                : valueB - valueA;
        }

        if (
            sortConfig.key === "validFrom" ||
            sortConfig.key === "validTo"
        ) {
            return sortConfig.direction === "asc"
                ? new Date(valueA) - new Date(valueB)
                : new Date(valueB) - new Date(valueA);
        }

        return sortConfig.direction === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
    });


    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

            <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
                <h2>Users</h2>

                <button onClick={onAddForm} className="flex items-center gap-1 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                    <Plus size={18} />
                    Add Users
                </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="disabled:text-gray-300"
                    >
                        <ChevronsLeft size={15} />
                    </button>

                    <div className="bg-[#4169e1] text-white rounded-md px-3 py-1">
                        {currentPage}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="disabled:text-gray-300"
                    >
                        <ChevronsRight size={15} />
                    </button>

                    <p className="text-gray-800 ml-2">
                        Showing {totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                        {" "}to{" "}
                        {Math.min(currentPage * pageSize, totalRecords)}
                        {" "}of {totalRecords} entries
                    </p>

                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-medium">Search:</span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full border-y border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    User Name
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("username", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("username", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Email Id
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("email", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("email", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Contact No.
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("contactNo", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("contactNo", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Valid Form
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("validFrom", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("validFrom", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Valid To
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("validTo", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("validTo", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Gender
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("gender", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("gender", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Role
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("role", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("role", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Active
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("active", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("active", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2 border-b border-l border-gray-300 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="py-6 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            sortedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-y border-gray-300">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={user.profilePicture}
                                                alt="User"
                                                className="h-8 w-8 rounded-full cursor-pointer"
                                            />
                                            <span>{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.email}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.contactNo}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.validFrom}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.validTo}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.gender}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.role === "ADMIN" ? "Admin" : "User"}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{user.isActive ? "Yes" : "No"}</td>

                                    <td className="px-4 py-2 border-b border-l border-gray-300">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                title="Edit"
                                                onClick={() => onEditUser(user)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                title="Delete"
                                                onClick={() => onDeleteUser(user.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable
