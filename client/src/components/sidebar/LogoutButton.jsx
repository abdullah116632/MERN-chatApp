import {useState} from 'react';
import { IoMdLogOut } from "react-icons/io";
import LogoutPopup from "./LogoutPopup"

const LogoutButton = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  return (
    <>
    <button className='mt-auto flex pb-2 w-full h-full' onClick={(e) => setIsPopupOpen(true)}>
    <IoMdLogOut className='w-6 h-6 cursore-pointer mt-3' />
        <p className='self-center mt-2 ml-2'>Logout</p>
    </button>
    {
      isPopupOpen && <LogoutPopup setIsPopupOpen={setIsPopupOpen} />
    }
    </>
  );
}

export default LogoutButton;
