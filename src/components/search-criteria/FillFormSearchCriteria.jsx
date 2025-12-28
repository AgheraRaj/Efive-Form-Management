import { useState } from "react";
import { Plus, Minus, RefreshCcw, Search } from "lucide-react";
import { useForm } from "react-hook-form";

const FillFormSearchCriteria = ({ formTitle, onSearch, onClose }) => {
  const [open, setOpen] = useState(true);

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      formId: "",
    },
  });


  const onSubmit = (data) => {
    if (!data.formId) return;
    onSearch(data.formId);
  };

  const handleReset = () => {
    reset();
    onSearch(null);
    onClose()
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-1 cursor-pointer select-none"
      >
        <div
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        >
          {open ? (
            <Minus size={15} strokeWidth={4} />
          ) : (
            <Plus size={15} strokeWidth={4} />
          )}
        </div>
        <span className="font-medium">Search Criteria</span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-2 border-t border-gray-300">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <label className="text-gray-800 font-medium">
              Search Form
            </label>

            <div className="flex items-center gap-3">
              <select
                {...register("formId")}
                className="w-1/3 px-3 py-0.5 border border-gray-300 rounded"
              >
                <option value="">Select</option>
                {formTitle.map((form) => (
                  <option key={form.formId} value={form.formId}>
                    {form.title}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-0.5 rounded-sm disabled:opacity-50"
              >
                <Search size={15} />
                Go
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 bg-[#4169e1] text-white px-2 py-0.5 rounded-sm"
              >
                <RefreshCcw size={15} />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FillFormSearchCriteria;
