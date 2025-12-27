import { createContext, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <ModalContext.Provider
            value={{
                open,
                toggleMenu: () => setOpen(!open),
                closeMenu: () => setOpen(false),

                isChangePasswordOpen,
                openChangePassword: () => {
                    setOpen(false)
                    setChangePasswordOpen(true) 
                },
                closeChangePassword: () => setChangePasswordOpen(false)
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)
