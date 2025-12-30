import { Printer, Save, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";


import { postFilledForm } from "../../api/form.api";
import MultiSelectDropdown from "../MultiSelectDropdown";

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

const VALIDATION_RULES = {
    ALL: {
        validate: () => true,
    },
    ALPHA: {
        pattern: {
            value: /^[A-Za-z\s]+$/,
            message: "Only alphabetic characters are allowed",
        },
    },
    NUMERIC: {
        pattern: {
            value: /^[0-9]+$/,
            message: "Only numbers are allowed",
        },
    },
    ALPHANUMERIC: {
        pattern: {
            value: /^[A-Za-z0-9\s]+$/,
            message: "Only letters and numbers are allowed",
        },
    },
};

const FormFill = ({ selectedForm, onSubmitted, onClose }) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    if (!selectedForm) return null;

    const normalizeToArray = (value) => {
        if (Array.isArray(value)) return value;
        if (value === undefined || value === null || value === "") return [];
        return [value];
    };

    const onSubmit = async (data) => {
        try {
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

            const res = await postFilledForm(payload);

            toast.success(
                res?.data?.message || "Form filled successfully"
            );

            onSubmitted?.();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Failed to submit form"
            );
        }
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

                {/* questions */}
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

                                {/* no answer */}
                                {uiType === "none" && (
                                    <p className="italic text-gray-500">
                                        No answer required
                                    </p>
                                )}

                                {/* radio button */}
                                {uiType === "radio" && (
                                    <>
                                        <div className="grid grid-cols-5">
                                            {q.answers.map((opt, i) => (
                                                <label
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <input
                                                        type="radio"
                                                        value={opt}
                                                        {...register(`answers.${q.id}`, { required: q.required })}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.answers?.[q.id] && q.required && (
                                            <p className="text-red-600 text-xs mt-1">
                                                This question is required
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* checkbox */}
                                {uiType === "checkbox" && (
                                    <>
                                        <div className="grid grid-cols-5">
                                            {q.answers.map((opt, i) => (
                                                <label
                                                    key={i}
                                                    className="flex items-center gap-2"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={opt}
                                                        {...register(`answers.${q.id}`)}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                        {errors.answers?.[q.id] && q.required && (
                                            <p className="text-red-600 text-xs mt-1">
                                                This question is required
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* text */}
                                {uiType === "text" && (
                                    <>
                                        <input
                                            type="text"
                                            {...register(`answers.${q.id}`, { required: q.required, ...(q.validationType ? VALIDATION_RULES[q.validationType] : {}) })}
                                            className="w-full sm:w-2/3 lg:w-1/2 border border-gray-300 rounded px-2 py-1"
                                        />

                                        {errors.answers?.[q.id] && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {errors.answers[q.id].message || "This question is required"}
                                            </p>
                                        )}
                                    </>
                                )}


                                {/* text area */}
                                {uiType === "textarea" && (
                                    <>
                                        <textarea
                                            rows={3}
                                            {...register(`answers.${q.id}`, { required: q.required, ...(q.validationType ? VALIDATION_RULES[q.validationType] : {}) })}
                                            className="w-full sm:w-2/3 lg:w-1/2 border border-gray-300 rounded px-2 py-1"
                                        />

                                        {errors.answers?.[q.id] && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {errors.answers[q.id].message || "This question is required"}
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* select dropdown */}
                                {uiType === "select" && (
                                    <>
                                        <select
                                            {...register(`answers.${q.id}`, { required: q.required })}
                                            className="w-full sm:w-1/2 lg:w-1/3 border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="">Select</option>
                                            {q.answers.map((opt, i) => (
                                                <option key={i} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.answers?.[q.id] && q.required && (
                                            <p className="text-red-600 text-xs mt-1">
                                                This question is required
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* multiselect dropdown */}
                                {uiType === "multiselect" && (
                                    <>
                                        <Controller
                                            name={`answers.${q.id}`}
                                            control={control}
                                            defaultValue={[]}
                                            rules={{ required: q.required }}
                                            render={({ field }) => (
                                                <MultiSelectDropdown
                                                    options={q.answers}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.answers?.[q.id] && q.required && (
                                            <p className="text-red-600 text-xs mt-1">
                                                This question is required
                                            </p>
                                        )}
                                    </>
                                )}

                                {/* date */}
                                {uiType === "date" && (
                                    <>
                                        <input
                                            type="date"
                                            {...register(`answers.${q.id}`, { required: q.required })}
                                            className="w-full sm:w-1/3 lg:w-1/5 border border-gray-300 rounded px-2 py-1"
                                        />
                                        {errors.answers?.[q.id] && q.required && (
                                            <p className="text-red-600 text-xs mt-1">
                                                This question is required
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}

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
