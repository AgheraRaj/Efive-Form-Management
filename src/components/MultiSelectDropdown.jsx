import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const MultiSelectDropdown = ({ options = [], value = [], onChange }) => {

    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (opt) => {
        if (value.includes(opt)) {
            onChange(value.filter((v) => v !== opt));
        } else {
            onChange([...value, opt]);
        }
    };

    const selectAll = () => onChange(options);
    const deselectAll = () => onChange([]);

    return (
        <div ref={ref} className="relative w-full sm:w-1/2 lg:w-1/3">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full border border-gray-300 rounded px-2 py-1 flex justify-between items-center bg-white"
            >
                <span className="text-left text-sm truncate">
                    {value.length > 0 ? value.join(", ") : "Select"}
                </span>
                <ChevronDown size={16} />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded shadow-md">

                    <div className="flex text-sm border-b border-gray-300">
                        <button
                            type="button"
                            onClick={selectAll}
                            className="w-1/2 px-2 py-1 hover:bg-gray-100"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            onClick={deselectAll}
                            className="w-1/2 px-2 py-1 hover:bg-gray-100 border-l border-gray-300"
                        >
                            Deselect All
                        </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                        {options.map((opt, i) => (
                            <label
                                key={i}
                                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 cursor-pointer text-sm"
                            >
                                <input
                                    type="checkbox"
                                    checked={value.includes(opt)}
                                    onChange={() => toggleOption(opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;
