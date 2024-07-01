import { useSocketContext } from "../../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../actions/messageAction";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import Options from "./Options";

const Conversation = ({
  conversation,
  lastIdx,
  isOptionsOpen,
  handleOptionsOpen,
}) => {
  
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state) => state.sliceA.selectedUserToMessage
  );
  

  const isSelected = selectedUser?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    dispatch(selectUser(conversation));
  };

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
            <div>
              <button
                className="text-xl text-blue-950 rounded-full hover:bg-gray-500 font-semibold hover:shadow-lg mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionsOpen()
                }}
              >
                <HiOutlineDotsHorizontal />
              </button>
              {isOptionsOpen && <Options handleOptionsOpen={handleOptionsOpen} conversation={conversation}/>}
              <span className="text-xl text-blue-950 font-bold mr-2">1</span>
            </div>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
