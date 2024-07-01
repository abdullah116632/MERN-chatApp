import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Settings from "./Settings";


const SettingsButton = ({setIsSettingOpen}) => {

    const handleClick = () => {
        setIsSettingOpen(true)
    }

  return (
    <div  className='mt-auto'>
            <IoSettingsSharp className='w-6 h-6 text-white cursore-pointer mt-3' onClick={handleClick} />
    </div>
  );
}

export default SettingsButton;
