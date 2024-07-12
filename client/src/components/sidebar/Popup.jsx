import { useDispatch } from "react-redux";
import { deleteConversationFromSidebar } from "../../actions/messageAction";
import { useStyleContext } from "../../context/StyleContext";

const Popup = ({ setIsOptionsOpen, setIsPopupOpen, conversation }) => {
  const dispatch = useDispatch();
  const {isMobile} = useStyleContext()

  const handleClick = () => {
    dispatch(deleteConversationFromSidebar(conversation));
  };

  return (
    <div className={`h-24 w-60 rounded-lg bg-slate-800 fixed ${isMobile ? "left-12 top-62" : "top-48 left-80"} flex flex-col items-center`}>
      <p className="pt-2 text-lg">Are you sure?</p>
      <div className="mt-4 w-full bg-zinc-800 flex justify-around">
        <button
          className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2"
          onClick={handleClick}
        >
          YES
        </button>
        <button
          className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2"
          onClick={(e) => {
            setIsOptionsOpen(false)
            setIsPopupOpen(false);
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default Popup;
