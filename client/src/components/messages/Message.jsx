import { useState } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";
import OptionsButton from "./OptionsButton";

const Message = ({ message, nextMessage }) => {
  const [isHovered, setIsHovered] = useState(false);

  const authUser = useSelector((state) => state.sliceA.authUser);
  const selectedUser = useSelector(
    (state) => state.sliceA.selectedUserToMessage
  );

  const fromMe = message.senderId === authUser._id;
  const formatedTime = shouldShowTimestamp(message, nextMessage)
    ? extractTime(message.createdAt)
    : "";
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedUser.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const haveProfilePic = shouldShowProfilePic(message, nextMessage);
  const marginWhenNoProfileForRecever = haveProfilePic ? "" : "ml-11";
  const isMessageRemoved = message.isRemoved;

  return (
    <div
      className={`chat ${chatClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {authUser._id !== message.senderId && haveProfilePic && (
        <div className="chat-image avatar">
          <div className="w-8 rounded-full">
            <img alt="tailwind css chat bubble component" src={profilePic} />
          </div>
        </div>
      )}
      <div className="flex">
        {fromMe && isHovered && !isMessageRemoved && <OptionsButton messageId={message._id} />}
        <div>
          {
            !isMessageRemoved ? (<div
            className={`chat-bubble text-white ${marginWhenNoProfileForRecever} ${bubbleBgColor}`}
          >
            {message.message}
          </div>) : (<div className={`bg-red-600 h-9 flex items-center border rounded-lg ${marginWhenNoProfileForRecever}`} ><p className=" text-yellow-50 mx-3 pb-1">This message is removed</p></div>)
          }
          <div className="chat-footer opacity-50 text-md font-medium flex gap-1 items-center text-gray-900">
            {formatedTime}
          </div>
        </div>
        {!fromMe && isHovered && !isMessageRemoved && <OptionsButton messageId={message._id} />}
      </div>
    </div>
  );
};

export default Message;

function shouldShowTimestamp(currentMessage, nextMessage) {
  if (!nextMessage) return true;

  const currentTime = new Date(currentMessage.createdAt);
  const nextTime = new Date(nextMessage.createdAt);

  const currentSender = currentMessage.senderId;
  const nextMessageSender = nextMessage.senderId;

  if (nextTime - currentTime > 7000 || currentSender !== nextMessageSender) {
    return true;
  } else {
    return false;
  }
}

function shouldShowProfilePic(currentMessage, nextMessage) {
  if (!nextMessage) return true;

  const currentTime = new Date(currentMessage.createdAt);
  const nextTime = new Date(nextMessage.createdAt);

  const currentSender = currentMessage.senderId;
  const nextMessageSender = nextMessage.senderId;

  if (nextTime - currentTime > 5000 || currentSender !== nextMessageSender) {
    return true;
  } else {
    return false;
  }
}
