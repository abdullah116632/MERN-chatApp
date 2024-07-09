import { MdDelete } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import MessageOptionsPopup from "./MessageOptionsPopup"


const MessageOptions = ({setIsOptionsOpen, messageId, fromMe}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={popupRef} >
    <div className={`absolute ${fromMe? "top-2 -left-[5.5rem]" : "top-2 -right-[5.3rem]"} bg-slate-800 rounded h-8 w-24 z-40 hover:bg-slate-700 hover:text-black`}>
      <button className="flex items-center mt-1 ml-2" onClick={(e) => setIsPopupOpen(true)}>
      <MdDelete className="mr-1"/>
        Remove
      </button>
      
    </div>
      {
        isPopupOpen && <MessageOptionsPopup messageId={messageId} setIsPopupOpen={setIsPopupOpen} fromMe={fromMe} />
      }
    </div>
  );
}

export default MessageOptions;
