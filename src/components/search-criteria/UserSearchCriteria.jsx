import { useState } from "react";
import { useForm } from "react-hook-form";
import { Minus, Plus, RefreshCcw, Search } from "lucide-react";

const UserSearchCriteria = ({ onSearch, onReset }) => {
    const [open, setOpen] = useState(true);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            role: "",
        },
    });

    const onSubmit = (data) => {
        onSearch(data);
    };

    const handleResetClick = () => {
        reset();
        onReset();
    };

    return (
        <div className="bg-white border border-gray-300 rounded-md shadow-md/30 my-4 mx-8">

            <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-1 cursor-pointer select-none"
            >
                <div className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} >
                    {open ? (
                        <Minus size={15} strokeWidth={4} />
                    ) : (
                        <Plus size={15} strokeWidth={4} />
                    )}
                </div>
                <span className="font-medium">Search Criteria</span>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`} >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-4 py-2 border-t border-gray-300"
                >
                    <div className="flex items-end gap-4">

                        <div className="w-1/4 flex flex-col space-y-1">
                            <label className="font-medium text-gray-800">Name</label>
                            <input
                                {...register("name")}
                                className="w-full border border-gray-300 rounded px-2 py-0.5"
                                placeholder="Search name"
                            />
                        </div>

                        <div className="w-1/4 flex flex-col space-y-1">
                            <label className="font-medium text-gray-800">Role</label>
                            <select
                                {...register("role")}
                                className="w-full border rounded px-2 py-0.5"
                            >
                                <option value="">Select</option>
                                <option value="ADMIN">Admin</option>
                                <option value="CLIENT">User</option>
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex items-center gap-1 bg-[#4169e1] text-white px-2 py-0.5 rounded"
                            >
                                <Search size={15} />
                                Search
                            </button>

                            <button
                                type="button"
                                onClick={handleResetClick}
                                className="flex items-center gap-1 bg-[#4169e1] text-white px-2 py-0.5 rounded"
                            >
                                <RefreshCcw size={15} />
                                Reset
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserSearchCriteria;
