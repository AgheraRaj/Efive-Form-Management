import { Pencil, Trash2, ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp, Plus, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import QuestionModal from "../modals/QuestionModal";
import AddEditQuestionModal from "../modals/AddEditQuestionModal";
import { deleteQuestion, getQuestion } from "../../api/form.api";
import Loader from "../Loader";

const QuestionTable = () => {

    const [openQuestionModal, setOpenQuestionModal] = useState(false);
    const [openAddEdit, setOpenAddEdit] = useState(false);

    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const dataInTable = 5;

    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [searchText, setSearchText] = useState("");

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null, // "asc" | "desc"
    });

    const filteredQuestions = question.filter((q) =>
        q.questionName?.toLowerCase().includes(searchText.toLowerCase()) ||
        q.answerType?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQuestions.length / dataInTable);

    const fetchQuestion = async () => {
        try {
            const res = await getQuestion();
            setQuestion(res.data);
        } catch (error) {
            console.error("Error fetching forms:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );
        if (!confirmDelete) return;

        try {
            await deleteQuestion(id);
            fetchQuestion();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const handleEdit = (question) => {
        setSelectedQuestion(question);
        setOpenAddEdit(true);
    };


    useEffect(() => {
        fetchQuestion();
    }, []);

    if (loading) {
        return <Loader />
    }

    const sortedQuestions = [...filteredQuestions].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const valueA = String(a[sortConfig.key]).toLowerCase();
        const valueB = String(b[sortConfig.key]).toLowerCase();

        if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const lastIndex = currentPage * dataInTable;
    const firstIndex = lastIndex - dataInTable;

    const paginatedQuestions = sortedQuestions.slice(firstIndex, lastIndex);

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white rounded-md">

            <div className="flex items-center justify-between pb-3 text-sm">
                <div className="flex items-center gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        className="disabled:text-gray-300"
                    >
                        <ChevronsLeft size={15} />
                    </button>

                    <div className="bg-[#4169e1] text-white rounded-md px-3 py-1">
                        {currentPage}
                    </div>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        className="disabled:text-gray-300"
                    >
                        <ChevronsRight size={15} />
                    </button>

                    <p className="text-gray-800 ml-2">
                        Showing {filteredQuestions.length === 0 ? 0 : firstIndex + 1}
                        {" "}to{" "}
                        {Math.min(lastIndex, filteredQuestions.length)}
                        {" "}of {filteredQuestions.length} entries
                    </p>

                </div>


                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-medium">Search:</span>
                        <input
                            type="text"
                            placeholder="Search question..."
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
                        />

                    </div>

                    <div className="flex items-center gap-2">
                        <div onClick={() => setOpenQuestionModal(true)} className="bg-[#4169e1] text-white rounded-sm px-2 py-1.5">
                            <ChevronsUpDown size={15} />
                        </div>
                        <button onClick={() => setOpenAddEdit(true)} className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                            <Plus size={15} />
                            Add
                        </button>
                    </div>
                </div>

                {openQuestionModal && (
                    <QuestionModal onClose={() => setOpenQuestionModal(false)} />
                )}

                {openAddEdit && (
                    <AddEditQuestionModal
                        onClose={() => {
                            setOpenAddEdit(false);
                            setSelectedQuestion(null);
                        }}
                        onSuccess={fetchQuestion}
                        editData={selectedQuestion}
                    />
                )}

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-y border-gray-300 text-sm">
                    <thead className="bg-gray-200 text-left">
                        <tr>
                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Question #
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Question Name
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Answer Type
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Required
                                    <div className="flex flex-col text-xs">
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2 border-l border-b border-gray-300 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedQuestions.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-6 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            paginatedQuestions.map((question) => (
                                <tr key={question.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {question.id}
                                    </td>

                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {question.questionName}
                                    </td>

                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {question.answerType}
                                    </td>

                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {question.required ? "Yes" : "No"}
                                    </td>

                                    <td className="px-4 py-2 border-l border-b border-gray-300">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                title="Edit"
                                                onClick={() => handleEdit(question)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                title="Delete"
                                                onClick={() => handleDelete(question.id)}
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

export default QuestionTable
