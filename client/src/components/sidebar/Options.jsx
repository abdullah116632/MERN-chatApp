import { MdDelete } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import Popup from "./Popup";
import { useStyleContext } from "../../context/StyleContext";

const Options = ({ setIsOptionsOpen, conversation }) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  const popupRef = useRef(null);

  const {isMobile} = useStyleContext()

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOptionsOpen(false)
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
      <div ref={popupRef} className={` absolute ${isMobile ? "right-10 -top-3" : "-top-3 right-0"} bg-slate-800 hover:text-red-300 rounded h-8 w-20 z-20 hover:bg-slate-700 `}>
        <button className="flex items-center mt-1 ml-2" onClick={(e) => setIsPopupOpen(true)}>
          <MdDelete />
          Delete
        </button>
        {isPopupOpen && (
        <div ref={popupRef}>
          <Popup
            setIsOptionsOpen={setIsOptionsOpen}
            setIsPopupOpen={setIsPopupOpen}
            conversation={conversation}
          />
        </div>
      )}
      </div>
      
    </>
  );
};

export default Options;
