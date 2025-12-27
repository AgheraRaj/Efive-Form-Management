import { Outlet } from 'react-router'


import Header from '../components/Header'
import Footer from '../components/Footer'
import bgImage from "../assets/theme/background1.jpg";
import { useModal } from '../hooks/ModalContext';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';

const UserLayout = () => {
  const { isChangePasswordOpen } = useModal()
  
    return (
        <div
          className="min-h-screen flex flex-col bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Overlay (controls image opacity) */}
          <div className="absolute inset-0 bg-white/70" />
  
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
  
            <main className="flex-1 mt-20">
              <Outlet />
            </main>
  
            <Footer />
          </div>
  
          {/* MODAL */}
              {isChangePasswordOpen && <ChangePasswordModal />}
        </div>
    );
}

export default UserLayout
