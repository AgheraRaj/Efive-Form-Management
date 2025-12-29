import { Pencil, Trash2, ChevronsRight, ChevronsLeft, ChevronDown, ChevronUp, Plus, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


import QuestionModal from "../modals/QuestionModal";
import AddEditQuestionModal from "../modals/AddEditQuestionModal";

const QuestionTable = ({ questions, setQuestions }) => {

    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [openQuestionModal, setOpenQuestionModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const dataInTable = 5;

    const [searchText, setSearchText] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });

    const filteredQuestions = questions.filter((q) =>
        q.questionName?.toLowerCase().includes(searchText.toLowerCase()) ||
        q.answerType?.toLowerCase().includes(searchText.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQuestions.length / dataInTable);

    useEffect(() => {
        const totalPages = Math.ceil(filteredQuestions.length / dataInTable);

        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }

        if (totalPages === 0) {
            setCurrentPage(1);
        }
    }, [filteredQuestions.length, currentPage]);


    const saveQuestion = (question) => {
        setQuestions(prev => {
            const exists = prev.find(q =>
                q.id ? q.id === question.id : q.tempId === question.tempId
            );
            return exists
                ? prev.map(q =>
                    q.id === question.id || q.tempId === question.tempId
                        ? question
                        : q
                )
                : [...prev, question];
        });
    };

    const handleDelete = (question) => {
        const confirmDelete = window.confirm("Delete this question?");
        if (!confirmDelete) return;

        setQuestions((prev) =>
            prev.filter((q) =>
                question.id
                    ? q.id !== question.id
                    : q.tempId !== question.tempId
            )
        );

        toast.success("Question deleted successfully");
    };


    const sortedQuestions = !sortConfig.key
        ? filteredQuestions
        : [...filteredQuestions].sort((a, b) => {
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
                ? String(valueA).localeCompare(String(valueB))
                : String(valueB).localeCompare(String(valueA));
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
                        type="button"
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
                        type="button"
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
                        <button type="button" onClick={() => setOpenAddEdit(true)} className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
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
                        editData={selectedQuestion}
                        onClose={() => {
                            setSelectedQuestion(null);
                            setOpenAddEdit(false);
                        }}
                        onSuccess={saveQuestion}
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
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("id", "asc")}><ChevronUp size={15} /></button>
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("id", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Question Name
                                    <div className="flex flex-col text-xs">
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("questionName", "asc")}><ChevronUp size={15} /></button>
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("questionName", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Answer Type
                                    <div className="flex flex-col text-xs">
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("answerType", "asc")}><ChevronUp size={15} /></button>
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("answerType", "desc")}><ChevronDown size={15} /></button>
                                    </div>
                                </div>
                            </th>

                            <th className="px-4 py-2">
                                <div className="flex items-center justify-between">
                                    Required
                                    <div className="flex flex-col text-xs">
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("required", "asc")}><ChevronUp size={15} /></button>
                                        <button type="button" className="cursor-pointer" onClick={() => handleSort("required", "desc")}><ChevronDown size={15} /></button>
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
                            paginatedQuestions.map((question, index) => (
                                <tr key={question.id || question.tempId} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-y border-gray-300">
                                        {index + 1}
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
                                                type="button"
                                                title="Edit"
                                                onClick={() => {
                                                    setSelectedQuestion(question);
                                                    setOpenAddEdit(true);
                                                }}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <Pencil size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Delete"
                                                onClick={() => handleDelete(question)}
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
