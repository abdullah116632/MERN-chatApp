import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Popup from "../sidebar/Popup";


const MessageOptions = ({handleOptionsOpen, conversation}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  return (
    <>
    <div className=' absolute bg-slate-800 rounded h-8 w-20 z-20 hover:bg-slate-700 hover:text-black'>
      <button className="flex items-center mt-1 ml-2" onClick={(e) => setIsPopupOpen(true)}>
      <MdDelete className=""/>
        Delete
      </button>
      
    </div>
    {
        isPopupOpen && <Popup handleOptionsOpen={handleOptionsOpen} setIsPopupOpen={setIsPopupOpen} conversation={conversation} />
      }
    </>
  );
}

export default MessageOptions;
