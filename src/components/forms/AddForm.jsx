import { RotateCcw, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


import QuestionTable from "../tables/QuestionTable";
import { postForm, updateForm } from "../../api/form.api";
import { useEffect, useState } from "react";

const AddForm = ({ onBack, onSuccess, editData }) => {

    const isEditMode = Boolean(editData);
    
    const [questions, setQuestions] = useState([]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: "",
            alias: "",
            module: "",
            characteristic: "",
            subCharacteristic: "",
            recurrence: "",
            startMonth: "",
            compliancePeriod: "",
            date: "",
            isActive: true,
            text: "",
        },
    });

    useEffect(() => {
        if (!editData) return;

        reset({
            title: editData.formTitle || "",
            alias: editData.aliasName || "",
            module: editData.module || "",
            characteristic: editData.characteristic || "",
            subCharacteristic: editData.subCharacteristic || "",
            recurrence: editData.recurrence || "",
            startMonth: editData.startMonth || "",
            compliancePeriod: editData.compliancePeriod || "",
            date: editData.effectiveDate
                ? editData.effectiveDate.split("T")[0]
                : "",
            isActive: editData.isActive ?? true,
            text: editData.text || "",
        });

        setQuestions(editData.questions || []);

    }, [editData, reset]);

    const onSubmit = async (data) => {
        const payload = {
            formTitle: data.title,
            aliasName: data.alias,
            module: Number(data.module),
            compliancePeriod: data.compliancePeriod,
            effectiveDate: data.date,
            text: data.text,
            isActive: data.isActive,
            characteristic: Number(data.characteristic),
            subCharacteristic: Number(data.subCharacteristic),
            recurrence: Number(data.recurrence),
            startMonth: Number(data.startMonth),
            questions,
        };

        try {
            let res;

            if (isEditMode) {
                res = await updateForm(editData.id, payload);
            } else {
                res = await postForm(payload);
            }

            toast.success(
                res?.data?.message ||
                (isEditMode ? "Form updated successfully" : "Form added successfully")
            );

            onSuccess?.();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };


    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

            <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
                <h2>{isEditMode ? "Edit Form" : "Add Form"}</h2>

                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                    <RotateCcw size={18} />
                    Move Back
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-3 space-y-5 text-sm">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">Form #</label>
                        <input
                            disabled
                            value={
                                isEditMode
                                    ? `${editData.id}`
                                    : "FORM-1"
                            }
                            className="w-full px-3 py-0.5 bg-gray-200 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="col-span-4">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Title Text (English) <span className="text-red-600">*</span>
                        </label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            type="text"
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="col-span-3">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Alias Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            {...register("alias", { required: "Alias name is required" })}
                            type="text"
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        />
                        {errors.alias && (
                            <p className="text-red-500 text-xs">{errors.alias.message}</p>
                        )}
                    </div>
                </div>

                <p className="text-[#4eb7eb] font-medium border-b border-b-gray-300 pb-1">
                    Form Attributes
                </p>

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Module <span className="text-red-600">*</span>
                        </label>
                        <select
                            {...register("module", {
                                required: "Module is required",
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        >
                            <option value="">Select</option>
                            <option value={1}>HASCheck</option>
                            <option value={2}>EHS</option>
                            <option value={3}>ENCheck</option>
                        </select>
                        {errors.module && (
                            <p className="text-red-500 text-xs">{errors.module.message}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Characteristic <span className="text-red-600">*</span>
                        </label>
                        <select
                            {...register("characteristic", {
                                required: "Characteristic is required",
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        >
                            <option value="">Select</option>
                            <option value={1}>Aboveground Storage Tanks</option>
                            <option value={2}>Air Emissions</option>
                            <option value={3}>Asbestos</option>
                            <option value={4}>Asbestos - Client Specific</option>
                            <option value={5}>Chemicals</option>
                        </select>
                        {errors.characteristic && (
                            <p className="text-red-500 text-xs">{errors.characteristic.message}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Sub-Characteristic <span className="text-red-600">*</span>
                        </label>
                        <select
                            {...register("subCharacteristic", {
                                required: "Sub-Characteristic is required",
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        >
                            <option value="">Select</option>
                            <option value={1}>Abatement</option>
                            <option value={2}>Documentation</option>
                            <option value={3}>General</option>
                            <option value={4}>Inspection</option>
                            <option value={5}>Insurance</option>
                        </select>
                        {errors.subCharacteristic && (
                            <p className="text-red-500 text-xs">{errors.subCharacteristic.message}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Recurrence <span className="text-red-600">*</span>
                        </label>
                        <select
                            {...register("recurrence", {
                                required: "Recurrence is required",
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        >
                            <option value="">Select</option>
                            <option value={1}>Annually</option>
                            <option value={2}>Bi-Monthly</option>
                            <option value={3}>Every 2 years</option>
                            <option value={4}>Every 3 years</option>
                            <option value={5}>Every 5 years</option>
                            <option value={6}>Monthly</option>
                            <option value={7}>One time</option>
                            <option value={8}>Quarterly</option>
                            <option value={9}>Semi-Annually</option>
                        </select>
                        {errors.recurrence && (
                            <p className="text-red-500 text-xs">{errors.recurrence.message}</p>
                        )}
                    </div>

                    <div className="col-span-2">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Start Month <span className="text-red-600">*</span>
                        </label>
                        <select
                            {...register("startMonth", {
                                required: "Start month is required",
                                valueAsNumber: true,
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        >
                            <option value="">Select</option>
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                        {errors.startMonth && (
                            <p className="text-red-500 text-xs">{errors.startMonth.message}</p>
                        )}
                    </div>

                    <div className="col-span-3">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Compliance Period <span className="text-red-600">*</span>
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={12}
                            placeholder="In Months (1 to 12)"
                            {...register("compliancePeriod", {
                                required: "Compliance period is required",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Value must be at least 1 month",
                                },
                                max: {
                                    value: 12,
                                    message: "Value must not exceed 12 months",
                                },
                            })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        />

                        {errors.compliancePeriod && (
                            <p className="text-red-500 text-xs">
                                {errors.compliancePeriod.message}
                            </p>
                        )}
                    </div>


                    <div className="col-span-3">
                        <label className="block mb-1 text-gray-800 font-medium">
                            Effective Date <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            className="w-full px-3 py-0.5 border border-gray-300 rounded"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-xs">{errors.date.message}</p>
                        )}
                    </div>

                    <div className="col-span-2 flex items-center gap-2 mt-6">
                        <input type="checkbox" {...register("isActive")} />
                        <span className="mb-1">Active</span>
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-gray-800 font-medium">
                        Text (English) <span className="text-red-600">*</span>
                    </label>
                    <textarea
                        {...register("text", { required: "Text name is required" })}
                        rows="4"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                    />
                    {errors.text && (
                        <p className="text-red-500 text-xs">{errors.text.message}</p>
                    )}
                </div>

                <p className="text-[#4eb7eb] font-medium border-b border-b-gray-300 pb-1">
                    Form Question
                </p>

                <QuestionTable
                    questions={questions}
                    setQuestions={setQuestions}
                />

                <div className="flex justify-center items-center gap-2 py-2">
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                        <Save size={18} />
                        {isEditMode ? "Update" : "Save"}
                    </button>
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-1 bg-[#4169e1] text-white px-2 py-1 rounded-sm">
                        <X size={18} />
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddForm;