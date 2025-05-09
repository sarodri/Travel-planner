import { useState } from "react";

const useToggleMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () =>{
        setIsOpen (prev => ! prev)
    }

    return {isOpen, toggleMenu}
}

export default useToggleMenu;