import { X, Save, Plus, Minus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";


const ANSWER_TYPES = {
  NONE: "NoAnswerRequired",
  SINGLE_CHOICE: "SingleChoice",
  MULTI_CHOICE: "MultipleChoice",
  SINGLE_TEXT: "SingleTextbox",
  MULTI_TEXT: "MultilineTextbox",
  SINGLE_SELECT: "SingleSelectDropdown",
  MULTI_SELECT: "MultiSelectDropdown",
  DATE: "Date",
};

const OPTION_BASED_TYPES = [
  ANSWER_TYPES.SINGLE_CHOICE,
  ANSWER_TYPES.MULTI_CHOICE,
  ANSWER_TYPES.SINGLE_SELECT,
  ANSWER_TYPES.MULTI_SELECT,
];

const TEXT_BASED_TYPES = [
  ANSWER_TYPES.SINGLE_TEXT,
  ANSWER_TYPES.MULTI_TEXT,
];

const AddEditQuestionModal = ({ onClose, onSuccess, editData }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const validateEnabled = watch("validateFormat");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "options",
  });

  useEffect(() => {
    if (!editData) {
      reset({
        label: "",
        name: "",
        description: "",
        answerType: "",
        options: [{ value: "" }],
        required: false,
        validateFormat: false,
        validationType: "",
        dateFormat: "",
      });
      return;
    }

    reset({
      label: editData.lable ?? "",
      name: editData.questionName ?? "",
      description: editData.description ?? "",
      answerType: editData.answerType ?? "",
      options:
        editData.answers?.length > 0
          ? editData.answers.map(a => ({ value: a }))
          : [{ value: "" }],
      required: !!editData.required,
      validateFormat: !!editData.validationType,
      validationType: editData.validationType || "",
      dateFormat: editData.dateFormat || "",
    });
  }, [editData, reset]);

  const answerType = watch("answerType");

  useEffect(() => {
    if (!answerType) return;

    if (!OPTION_BASED_TYPES.includes(answerType)) {
      replace([]);
    }

    if (OPTION_BASED_TYPES.includes(answerType) && fields.length === 0) {
      replace([{ value: "" }]);
    }
  }, [answerType]);

  useEffect(() => {
    if (answerType === ANSWER_TYPES.NONE) {
      setValue("required", false);
      setValue("validateFormat", false);
      setValue("validationType", "");
      setValue("dateFormat", "");
    }

    else if (answerType !== ANSWER_TYPES.SINGLE_TEXT || ANSWER_TYPES.MULTI_TEXT) {
      setValue("validateFormat", false);
      setValue("validationType", "");
      setValue("dateFormat", "");
    }
  }, [answerType, setValue]);

  const onSubmit = (data) => {
    const payload = {
      id: editData?.id,
      tempId: editData?.tempId || Date.now(),
      lable: data.label,
      questionName: data.name,
      description: data.description,
      answerType: data.answerType,
      answers: OPTION_BASED_TYPES.includes(data.answerType)
        ? data.options.map(o => o.value).filter(Boolean)
        : [],
      required: data.required,
      validationType:
        TEXT_BASED_TYPES.includes(data.answerType) && data.validateFormat
          ? data.validationType
          : null,
      dateFormat:
        data.answerType === ANSWER_TYPES.DATE ? data.dateFormat : null,
    };

    onSuccess(payload);
    onClose();
  };


  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 z-50 w-4xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#4169e1] text-white px-4 py-2 rounded-t-md">
          <h3 className="font-semibold text-sm">
            {editData ? "Edit Form Question" : "Add Form Question"}
          </h3>

          <button type="button" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 text-sm">

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="font-medium">
              Question Label <span className="text-red-600">*</span>
            </label>
            <input
              {...register("label", { required: "Question label is required" })}
              placeholder="Enter Your Question Label in English"
              className="col-span-3 border border-gray-300 rounded px-3 py-1"
            />
            {errors.label && (
              <p className="text-red-500 text-xs">{errors.label.message}</p>
            )}
          </div>

          {/* Question Name */}
          <div className="grid grid-cols-4 items-center gap-3">
            <label className="font-medium">
              Question Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register("name", { required: "Question name is required" })}
              placeholder="Enter Your Question in English"
              className="col-span-3 border border-gray-300 rounded px-3 py-1"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 gap-3">
            <label className="font-medium">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter Description in English"
              rows={3}
              className="col-span-3 border border-gray-300 rounded px-3 py-1"
            />
          </div>

          {/* Answer Type */}
          <div className="grid grid-cols-4 items-center gap-3">
            <label className="font-medium">
              Answer Type <span className="text-red-600">*</span>
            </label>
            <select
              {...register("answerType", {
                required: "Answer type is required",
              })}
              className="col-span-3 border border-gray-300 rounded px-3 py-1"
            >
              <option value="">Select Answer Type</option>
              {Object.values(ANSWER_TYPES).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.answerType && (
              <p className="text-red-500 text-xs">
                {errors.answerType.message}
              </p>
            )}
          </div>

          {/* OPTIONS */}
          {OPTION_BASED_TYPES.includes(answerType) && (
  <div className="border-t border-gray-300 pt-4 space-y-2">
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-start gap-2">
        
        {/* Input + Error */}
        <div className="flex-1">
          <input
            {...register(`options.${index}.value`, {
              required: "Option is required",
            })}
            className="w-full border border-gray-300 rounded px-3 py-1"
          />

          {errors.options?.[index]?.value && (
            <p className="text-red-500 text-xs mt-1">
              {errors.options[index].value.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="border-2 border-gray-400 text-gray-400 p-0.5 mt-0.5 rounded-sm"
        >
          <Plus size={18} />
        </button>

        {fields.length > 1 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="border-2 border-gray-400 text-gray-400 p-0.5 mt-0.5 rounded-sm"
          >
            <Minus size={18} />
          </button>
        )}
      </div>
    ))}
  </div>
)}

          {/* REQUIRED / VALIDATION / DATE */}
          {answerType && answerType !== ANSWER_TYPES.NONE && (
            <div className="border border-gray-300 rounded px-3 py-2 space-y-2">
              <div className="flex items-center space-x-20">
                <div className="flex items-center gap-2">
                  <input type="checkbox" {...register("required")} />
                  <span>Require an Answer to This Question</span>
                </div>

                {answerType === ANSWER_TYPES.DATE && (
                  <input
                    {...register("dateFormat")}
                    placeholder="DD/MM/YYYY"
                    className="border border-gray-300 rounded px-3 py-1 bg-gray-100"
                  />
                )}
              </div>

              {TEXT_BASED_TYPES.includes(answerType) && (
                <div className="flex items-center space-x-20">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" {...register("validateFormat")} />
                    <span>Validate Answer for a Specific Format</span>
                  </div>

                  {validateEnabled && (
                    <select
                      {...register("validationType", {
                        required: "Validation type required",
                      })}
                      className="border border-gray-300 rounded px-3 py-1"
                    >
                      <option value="">Answer Should Be</option>
                      <option value="ALL">All Characters</option>
                      <option value="ALPHA">Only Alphabet</option>
                      <option value="NUMERIC">Only Number</option>
                      <option value="ALPHANUMERIC">
                        Alphabet & Number
                      </option>
                    </select>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-300">
            <button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="flex items-center gap-2 bg-[#4169e1] text-white px-4 py-1.5 rounded"
            >
              <Save size={14} /> {editData ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 bg-[#4169e1] text-white px-4 py-1.5 rounded"
            >
              <X size={14} /> Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditQuestionModal;
