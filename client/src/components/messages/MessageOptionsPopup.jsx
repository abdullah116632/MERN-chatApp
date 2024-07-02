import { useDispatch, useSelector } from "react-redux";
import { removeMessageFromChat } from "../../actions/messageAction";

const MessageOptionsPopup = ({messageId}) => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.sliceA.messages)
    console.log(state)
    
    const handleClick = () => {
        dispatch(removeMessageFromChat(messageId))
    }

  return (
    <div className=" h-28 w-60 rounded-lg bg-slate-800 fixed top-48 left-80 flex flex-col items-center">
      <p className="pt-2 text-lg">Are you sure ? </p>
      <p className=" text-lg"> to delete this message.</p>
      <div className="mt-2 w-full bg-zinc-800 flex justify-around">
        <button className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2" onClick={handleClick}>
          YES
        </button>
        <button
          className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2"
          onClick={(e) => {
            setIsPopupOpen(false);
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default MessageOptionsPopup;

