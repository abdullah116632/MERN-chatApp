import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const OptionsButton = ({setIsOptionsOpen}) => {
  
  return (
          <div >
            <button className="text-slate-900 mx-2 mt-4" onClick={(e) => setIsOptionsOpen(true)}>
            <BsThreeDotsVertical />
          </button>
          </div>
  );
}

export default OptionsButton;
