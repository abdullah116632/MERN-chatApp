import { useState } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";
import OptionsButton from "./OptionsButton";
import MessageOptions from "./MessageOptions";


const Message = ({ message, nextMessage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

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
  const isMessageRemovedFromAll = message.removedForEveryone;
  const isMessageRemovedFromMe = message.removedBy.includes(authUser._id)

  return (
    <div
      className={`chat ${chatClassName} ${fromMe ? "" : marginWhenNoProfileForRecever}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {authUser._id !== message.senderId && haveProfilePic && (
        <div className="chat-image avatar mb-4">
          <div className="w-8 rounded-full">
            <img alt="user profile" src={profilePic} />
          </div>
        </div>
      )}
      <div className=" relative flex">
      {fromMe && isHovered && !(isMessageRemovedFromAll || isMessageRemovedFromMe) && <OptionsButton setIsOptionsOpen={setIsOptionsOpen} />}
        {fromMe && isOptionsOpen && <MessageOptions setIsOptionsOpen={setIsOptionsOpen} messageId={message._id} fromMe={fromMe}  />}
        <div>
          {
            !(isMessageRemovedFromAll || isMessageRemovedFromMe) ? (!message.isFile ? (<div
              className={`chat-bubble text-white ${bubbleBgColor} max-w-xs`}
            >
              {message.message}
            </div>) : (<img className=" w-56 rounded-sm" src={message.message}/>)) : (<div className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-red-700 rounded-lg p-2 flex items-center shadow-md">
              <p className="text-sm font-semibold mx-2">This message has been removed</p>
            </div>)
          }
          <div className="chat-footer opacity-50 text-md font-medium flex gap-1 items-center text-gray-900">
            {formatedTime}
          </div>
        </div>
        {!fromMe && isHovered && !(isMessageRemovedFromAll || isMessageRemovedFromMe) && <OptionsButton setIsOptionsOpen={setIsOptionsOpen} />}
        {!fromMe && isOptionsOpen && <MessageOptions setIsOptionsOpen={setIsOptionsOpen} messageId={message._id} fromMe={fromMe} />}
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
