import { ChevronDown, Key, LogOut, User } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { jwtDecode } from 'jwt-decode';

import user from "../../assets/users/face.jpg"
import { useModal } from '../../hooks/ModalContext';
import { useAuth } from '../../hooks/AuthContext';

const HeaderMenu = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    const profilePath =
        role === "ADMIN" ? "/admin/profile" : "/user/profile";

    const {
        open,
        toggleMenu,
        closeMenu,
        openChangePassword,
    } = useModal()

    return (
        <div className="relative group">
            <div onClick={toggleMenu} className='py-2 px-2 flex items-center gap-2 cursor-pointer hover:bg-[#4169e1] hover:text-white transition-colors duration-400'>
                <img src={user} alt="user" className='h-8 rounded-full' />
                <div className='flex items-center gap-1'>
                    <p className='text-sm'>{role}</p>
                    <ChevronDown
                        size={15}
                        className="mt-0.5"
                    />
                </div>
            </div>

            <div className={`w-52 overflow-hidden transition-all duration-400 z-50 absolute right-0 top-full bg-white border border-gray-300 shadow-md/30 rounded-md ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <NavLink
                    onClick={closeMenu}
                    to={profilePath}
                    className="px-4 py-2 text-sm hover:bg-[#4169e1] hover:text-white flex items-center gap-2"
                >
                    <User size={18} /> Profile
                </NavLink>

                <NavLink
                    onClick={openChangePassword}
                    className="px-4 py-2 text-sm hover:bg-[#4169e1] hover:text-white flex items-center gap-2"
                >
                    <Key size={18} /> Change Password
                </NavLink>

                <NavLink
                    onClick={() => {
                        logout();
                        closeMenu();
                        navigate("/");
                    }}
                    className="px-4 py-2 text-sm hover:bg-[#4169e1] hover:text-white flex items-center gap-2"
                >
                    <LogOut size={18} /> Logout
                </NavLink>
            </div>
        </div >
    )
}

export default HeaderMenu
