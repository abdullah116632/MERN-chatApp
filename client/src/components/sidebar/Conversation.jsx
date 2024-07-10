import { useSocketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../actions/messageAction";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Options from "./Options";
import { useEffect, useState } from "react";
import { numberOfUnseenMessages, resetUnseenMessages } from "../../api";
import useCountUnseenMessage from "../../hooks/useCountUnseenMessage";

const Conversation = ({
  conversation,
  lastIdx,
  isOptionsOpen,
  handleOptionsOpen,
}) => {
  
  const [unseenMessages, setUnseenMessages] = useState(0);

  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state) => state.sliceA.selectedUserToMessage
  );

  const isSelected = selectedUser?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = async () => {
    dispatch(selectUser(conversation));
    await resetUnseenMessages(conversation._id);
    setUnseenMessages(0);
  };

  useCountUnseenMessage(conversation, selectedUser, setUnseenMessages);

  useEffect(() => {
    const countUnseenMessages = async (userId) => {
      const { data } = await numberOfUnseenMessages(userId);
      setUnseenMessages(data.data.unseenCount);
    };

    countUnseenMessages(conversation._id);
  }, [conversation._id]);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full border-slate-900">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-slate-900">{conversation.name}</p>
            <div className="flex">
              <button
                className="text-xl text-blue-950 rounded-full hover:bg-gray-500 font-semibold hover:shadow-lg mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionsOpen();
                }}
              >
                <HiOutlineDotsHorizontal />
              </button>
              {isOptionsOpen && (
                <Options
                  handleOptionsOpen={handleOptionsOpen}
                  conversation={conversation}
                />
              )}
              {unseenMessages > 0 && (
                <span className="text-white bg-red-600 w-6 h-6 rounded-full flex items-center justify-center font-bold mr-2 p-2">
                  {unseenMessages}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
