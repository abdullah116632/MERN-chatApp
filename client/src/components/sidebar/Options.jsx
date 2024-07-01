import { MdDelete } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import Popup from "./Popup";

const Options = ({handleOptionsOpen, conversation}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleOptionsOpen();
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
    <div ref={popupRef} className=' absolute bg-slate-800 rounded h-8 w-20 z-20 hover:bg-slate-700 hover:text-black'>
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

export default Options;
