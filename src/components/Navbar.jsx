import { CircleCheck, CirclePlus, FileText } from 'lucide-react'
import { NavLink } from 'react-router'
import { jwtDecode } from 'jwt-decode'


import MastersMenu from './menus/MastersMenu'
import { useAuth } from '../hooks/AuthContext'

const Navbar = () => {

    const { token } = useAuth();
    
    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    return (
        <>
            {role === "ADMIN" && (
                <div className='bg-white px-8 shadow-md/30'>

                    <nav className='flex'>
                        <NavLink
                            to="/admin/create-form"
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 border-l border-gray-300 transition-colors duration-400 ${isActive ? "bg-[#4169e1] text-white" : "hover:bg-[#4169e1] hover:text-white"}`}
                        >
                            <CirclePlus size={15} />
                            <p className='text-sm'>Create Form</p>
                        </NavLink>

                        <NavLink
                            to="/admin/fill-form"
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 border-l border-gray-300 transition-colors duration-400 ${isActive ? "bg-[#4169e1] text-white" : "hover:bg-[#4169e1] hover:text-white"}`}
                        >
                            <FileText size={15} />
                            <p className='text-sm'>Fill Form</p>
                        </NavLink>

                        <NavLink
                            to="/admin/completed-form"
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 border-x border-gray-300 transition-colors duration-400 ${isActive ? "bg-[#4169e1] text-white" : "hover:bg-[#4169e1] hover:text-white"}`}
                        >
                            <CircleCheck size={15} />
                            <p className='text-sm'>Completed Form</p>
                        </NavLink>

                        <MastersMenu />
                    </nav>

                </div>
            )}

            {role === "CLIENT" && (
                <div className='bg-white px-8 shadow-md/30'>
                    <nav className='flex'>
                        <NavLink
                            to="/user/fill-form"
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 border-l border-gray-300 transition-colors duration-400 ${isActive ? "bg-[#4169e1] text-white" : "hover:bg-[#4169e1] hover:text-white"}`}
                        >
                            <FileText size={15} />
                            <p className='text-sm'>Fill Form</p>
                        </NavLink>

                        <NavLink
                            to="/user/completed-form"
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 border-l border-gray-300 transition-colors duration-400 ${isActive ? "bg-[#4169e1] text-white" : "hover:bg-[#4169e1] hover:text-white"}`}
                        >
                            <CircleCheck size={15} />
                            <p className='text-sm'>Completed Form</p>
                        </NavLink>
                    </nav>

                </div>
            )}
        </>
    )
}

export default Navbar
