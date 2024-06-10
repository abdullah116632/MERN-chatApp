import { useSocketContext } from "../../context/SocketContext";
import {useDispatch, useSelector} from "react-redux"
import { selectUser } from "../../actions/messageAction";

const Conversation = ({ conversation, lastIdx }) => {

  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.sliceA.selectedUserToMessage);

  const isSelected = selectedUser?._id === conversation._id;
  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)


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
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl text-blue-950 font-bold mr-2">1</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
