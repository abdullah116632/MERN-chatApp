import { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import MessageOptions from './MessageOptions';

const OptionsButton = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    console.log(isOptionsOpen)

  return (
          <div>
            <button className="text-slate-900 mx-2 mt-4 relative" onClick={(e) => setIsOptionsOpen(true)}>
            <BsThreeDotsVertical />
          </button>
          {
            isOptionsOpen && <MessageOptions />
          }
          </div>
  );
}

export default OptionsButton;
