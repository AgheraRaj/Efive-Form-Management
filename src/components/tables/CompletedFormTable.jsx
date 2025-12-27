import { Eye, ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import FormPreviewSidebar from "../forms/FormPreviewSidebar";

const CompletedFormTable = ({ data, currentPage, totalPages, totalRecords, pageSize, onPageChange, onSearch }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null, // "asc" | "desc"
    });

    const sortedForms = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valueA = a[sortConfig.key].toString().toLowerCase();
        const valueB = b[sortConfig.key].toString().toLowerCase();

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    const handleView = (form) => {
        setSelectedForm(form);
        setIsSidebarOpen(true);
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

            <h2 className="px-4 py-2 border-b border-b-gray-300">Completed Form</h2>

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
                        placeholder="Search completed forms..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                    />
                </div>
            </div>

            <FormPreviewSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                form={selectedForm}
            />

            {/* Table */}
            <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full border-y border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Completed Date
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Form #
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Form Name
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Created By
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2 border-b border-l border-gray-300 text-center">
                                Preview
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedForms.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="py-6 text-center text-gray-500"
                                >
                                    No forms available
                                </td>
                            </tr>
                        ) : (
                            sortedForms.map((form) => (
                                <tr key={form.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-y border-gray-300">{form.completedDate}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{form.formId}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{form.formTitle}</td>
                                    <td className="px-4 py-2 border-y border-gray-300">{form.active ? "Yes" : "No"}</td>

                                    <td className="px-4 py-2 text-center border-b border-l border-gray-300">
                                        <button
                                            title="View"
                                            onClick={() => handleView(form)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Eye size={16} />
                                        </button>
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

export default CompletedFormTable
