import { Plus, Pencil, Eye, Trash2, ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { getFormById } from "../../api/form.api";
import FormFillPreview from "../forms/FormFillPreview";

function FormTable({ onAddForm, onSearch, onEditForm, onDeleteForm, data, currentPage, totalPages, totalRecords, pageSize, onPageChange }) {

    const [isOpen, setIsOpen] = useState(false)
    const [selectedForm, setSelectedForm] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null, // "asc" | "desc"
    });

    const [searchValue, setSearchValue] = useState("");

    const sortedForms = !sortConfig.key
    ? data
    : [...data].sort((a, b) => {
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

        return sortConfig.direction === "asc"
            ? valueA.toString().localeCompare(valueB.toString())
            : valueB.toString().localeCompare(valueA.toString());
    });

    const searchForm = async (formId) => {
        if (!formId) return;

        const res = await getFormById(formId);
        setSelectedForm(res.data.data);
        setIsOpen(true)
    }

    const handleFormSubmitted = () => {
        setSelectedForm(null);
    };

    const onClose = () => {
        setSelectedForm(null);
        setIsOpen(false)
    }

    const startEntry = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalRecords);

    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

            <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
                <h2>Form</h2>

                <button type="button" onClick={onAddForm} className="flex items-center gap-1 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                    <Plus size={18} />
                    Add Form
                </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
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
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="disabled:text-gray-300"
                    >
                        <ChevronsRight size={15} />
                    </button>

                    <p className="text-gray-800 ml-2">
                        Showing {startEntry} to {endEntry} of {totalRecords} entries
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-medium">Search:</span>
                    <input
                        type="text"
                        value={searchValue}
                        placeholder="Search by form title..."
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            onSearch(e.target.value);
                        }}
                        className="border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                    />
                </div>
            </div>

            <FormFillPreview
                selectedForm={selectedForm}
                onSubmitted={handleFormSubmitted}
                onClose={onClose}
                isOpen={isOpen}
            />

            {/* Table */}
            <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full border-y border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Form #
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "id", direction: "asc" })}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "id", direction: "desc" })}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Form Title
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "formTitle", direction: "asc" })}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "formTitle", direction: "desc" })}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Active
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "isActive", direction: "asc" })}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => setSortConfig({ key: "isActive", direction: "desc" })}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2 border-b border-l border-gray-300 text-center">
                                Action
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
                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {form.id}
                                    </td>

                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {form.formTitle}
                                    </td>

                                    <td className="px-4 py-2 border-y border-gray-300">
                                        <span className="px-2 py-0.5 rounded">
                                            {form.isActive ? "Yes" : "No"}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 border-b border-l border-gray-300">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                title="Edit"
                                                onClick={() => onEditForm(form)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="View"
                                                onClick={() => searchForm(form.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete"
                                                onClick={() => onDeleteForm(form.id)}
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

export default FormTable