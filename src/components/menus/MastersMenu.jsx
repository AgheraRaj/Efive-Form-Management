import { NavLink, useLocation } from "react-router";
import { GraduationCap, ChevronDown } from "lucide-react";

const MastersMenu = () => {

    const location = useLocation();
    const isMastersActive = location.pathname.startsWith("/admin/user");

    return (
        <div className="relative group">

            <div className={`flex items-center gap-2 py-2 px-4 cursor-pointer border-r border-gray-300 ${isMastersActive ? "bg-[#4169e1] text-white" : "group-hover:bg-[#4169e1] group-hover:text-white"}`}>
                <GraduationCap size={16} />
                <p className="text-sm">Masters</p>
                <ChevronDown size={15} />
            </div>

            <div className="absolute right-0 top-full w-30 bg-white border border-gray-300 shadow-md rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 z-50 overflow-hidden">
                <NavLink
                    to="/admin/user"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-[#4169e1] font-semibold"
                >
                    User
                </NavLink>
            </div>
        </div>
    );
};

export default MastersMenu;
