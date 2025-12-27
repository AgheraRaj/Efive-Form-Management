import logo from "../assets/images/e5logo.png"
import Navbar from './Navbar'
import HeaderMenu from './menus/HeaderMenu'

const Header = () => {
    return (
        <header className='fixed w-full'>
            <div className='bg-white flex justify-between items-center px-8 border-b border-b-[#4169e1]'>
                <img src={logo} alt="Logo" className="h-10" />

                <HeaderMenu />
            </div>
            <Navbar />
        </header>
    )
}

export default Header
