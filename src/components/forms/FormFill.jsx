import { Printer, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { postFilledForm } from "../../api/form.api";

const ANSWER_TYPE_MAP = {
    NoAnswerRequired: "none",
    SingleChoice: "radio",
    MultipleChoice: "checkbox",
    SingleTextbox: "text",
    MultilineTextbox: "textarea",
    SingleSelectDropdown: "select",
    MultiSelectDropdown: "multiselect",
    Date: "date",
};

const FormFill = ({ selectedForm, onSubmitted, onClose }) => {
    const { register, handleSubmit } = useForm();

    if (!selectedForm) return null;

    const normalizeToArray = (value) => {
        if (Array.isArray(value)) return value;
        if (value === undefined || value === null || value === "") return [];
        return [value];
    };

    const onSubmit = async (data) => {
        const answeredQuestions = selectedForm.questions.map((q) => {
            const rawAnswer = data.answers?.[q.id];

            return {
                questionId: q.id,
                questionName: q.questionName,
                description: q.description ?? null,
                answers: normalizeToArray(rawAnswer),
            };
        });

        const payload = {
            formId: selectedForm.formId,
            answeredQuestions,
        };

        await postFilledForm(payload);
        onSubmitted?.();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-2 sm:mx-4 lg:mx-8"
        >

            <h2 className="flex items-center gap-2 px-4 py-2 border-b border-gray-300">
                Fill Form
            </h2>

            <div className="p-3 sm:p-4 bg-[#f3f3f3] space-y-3 text-sm">

                {/* FORM HEADER */}
                <div className="p-3 bg-[#d4e4ef] rounded-sm shadow-md/30 space-y-2">
                    <p className="font-semibold">
                        <span className="font-bold">Form Title:</span>{" "}
                        {selectedForm.formTitle}
                    </p>
                    <p className="font-semibold">
                        <span className="font-bold">Description:</span>{" "}
                        {selectedForm.description}
                    </p>
                </div>

                {/* QUESTIONS */}
                {selectedForm.questions.map((q, index) => {
                    const uiType = ANSWER_TYPE_MAP[q.answerType];

                    return (
                        <div
                            key={q.id}
                            className="border border-gray-300 rounded bg-white shadow-md/30 flex items-start gap-5 p-3"
                        >
                            <div className="w-full sm:w-40 font-semibold text-center bg-[#4169e1] text-white px-3 py-1 rounded">
                                Q : {index + 1}
                            </div>

                            <div className="w-full">
                                <p className="font-semibold pb-1.5">
                                    {q.required && (
                                        <span className="text-red-600">*</span>
                                    )}{" "}
                                    {q.questionName}
                                </p>

                                {q.description && (
                                    <p className="pb-3 text-gray-700">
                                        {q.description}
                                    </p>
                                )}

                                {/* NO ANSWER */}
                                {uiType === "none" && (
                                    <p className="italic text-gray-500">
                                        No answer required
                                    </p>
                                )}

                                {/* RADIO */}
                                {uiType === "radio" && (
                                    <div className="grid grid-cols-5">
                                        {q.answers.map((opt, i) => (
                                            <label
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="radio"
                                                    value={opt}
                                                    {...register(
                                                        `answers.${q.id}`,
                                                        {
                                                            required:
                                                                q.required,
                                                        }
                                                    )}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {/* CHECKBOX */}
                                {uiType === "checkbox" && (
                                    <div className="grid grid-cols-5">
                                        {q.answers.map((opt, i) => (
                                            <label
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={opt}
                                                    {...register(
                                                        `answers.${q.id}`
                                                    )}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {/* TEXT */}
                                {uiType === "text" && (
                                    <input
                                        type="text"
                                        {...register(`answers.${q.id}`, {
                                            required: q.required,
                                        })}
                                        className="w-full sm:w-2/3 lg:w-1/2 border border-gray-300 rounded px-2 py-1"
                                    />
                                )}

                                {/* TEXTAREA */}
                                {uiType === "textarea" && (
                                    <textarea
                                        rows={3}
                                        {...register(`answers.${q.id}`, {
                                            required: q.required,
                                        })}
                                        className="w-full sm:w-2/3 lg:w-1/2 border border-gray-300 rounded px-2 py-1"
                                    />
                                )}

                                {/* SELECT */}
                                {uiType === "select" && (
                                    <select
                                        {...register(`answers.${q.id}`, {
                                            required: q.required,
                                        })}
                                        className="w-full sm:w-1/2 lg:w-1/3 border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="">Select</option>
                                        {q.answers.map((opt, i) => (
                                            <option key={i} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {/* DATE */}
                                {uiType === "date" && (
                                    <input
                                        type="date"
                                        {...register(`answers.${q.id}`, {
                                            required: q.required,
                                        })}
                                        className="w-full sm:w-1/3 lg:w-1/5 border border-gray-300 rounded px-2 py-1"
                                    />
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                    <button
                        type="submit"
                        className="bg-[#4169e1] text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Save size={18} /> Submit
                    </button>

                    <button
                        type="button"
                        className="bg-[#4169e1] text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Printer size={18} /> Print
                    </button>

                    <button
                        onClick={onClose}
                        type="button"
                        className="bg-[#4169e1] text-white px-4 py-2 rounded flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <X size={18} /> Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormFill;
