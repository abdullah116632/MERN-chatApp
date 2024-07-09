import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../../actions/messageAction";


const Messages = () => {
  const [loading, setLoading] = useState(null);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.sliceA.selectedUserToMessage)
  const messages = useSelector((state) => state.sliceA.messages)

  const lastMessageRef = useRef();

  useEffect(() => {
    setLoading(true);
    dispatch(getMessage(user._id));
    setLoading(false);
  },[user?._id])

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    }, 100)
  },[messages])


  return (
    <div className="pl-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} nextMessage={messages[index+1]} />
        </div>
      ))}
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-slate-800">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
