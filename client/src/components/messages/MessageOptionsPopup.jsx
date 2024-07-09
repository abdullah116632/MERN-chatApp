import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeMessageForAllFromChat, removeMessageForSenderFromChat } from "../../actions/messageAction";


const MessageOptionsPopup = ({ messageId, setIsPopupOpen, fromMe }) => {

  const selectedUser = useSelector((state) => state.sliceA.selectedUserToMessage)
  const dispatch = useDispatch();

  const handleRemoveFromMe = async () => {
    await dispatch(removeMessageForSenderFromChat(messageId))
    setIsPopupOpen(false)
  };

  const handleRemoveFromAll = async () => {
    await dispatch(removeMessageForAllFromChat(messageId, selectedUser._id))
    setIsPopupOpen(false)
  }

  return (
    <div className={`${fromMe ? "h-44" : "h-32"} w-60 rounded-lg bg-[#2a2d34] shadow-lg text-slate-200 flex flex-col items-center fixed top-48 right-28 z-50 p-4`}>
      <div className="text-gray-200 w-full">
        {!fromMe ? (
          <button
            onClick={handleRemoveFromMe}
            className="w-full bg-[#74512D] rounded-lg py-2 mt-2 hover:text-gray-900 hover:bg-[#a36b40] flex items-center justify-center transition-all duration-200"
          >
            <AiFillDelete className="mr-2" />
            Remove from me
          </button>
        ) : (
          <div className="flex flex-col gap-3 items-center mt-2 w-full">
            <button
              onClick={handleRemoveFromMe}
              className="w-full bg-[#74512D] rounded-lg py-2 hover:text-gray-900 hover:bg-[#a36b40] flex items-center justify-center transition-all duration-200"
            >
              <AiFillDelete className="mr-2" />
              Remove from me
            </button>
            <button
              onClick={handleRemoveFromAll}
              className="w-full mb-2 bg-[#74512D] rounded-lg py-2 hover:text-gray-900 hover:bg-[#a36b40] flex items-center justify-center transition-all duration-200"
            >
              <AiFillDelete className="mr-2" />
              Remove from everyone
            </button>
          </div>
        )}
      </div>
      <button
        className="mt-auto w-full bg-zinc-800 rounded-xl py-2 text-center hover:bg-zinc-700 transition-all duration-200"
        onClick={() => setIsPopupOpen(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default MessageOptionsPopup;

