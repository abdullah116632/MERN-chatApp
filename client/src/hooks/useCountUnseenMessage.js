import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
import { updateSingleMessageAsSeen } from "../api";


const useCountUnseenMessage = (conversation, selectedUser, setUnseenMessages) => {
    const {socket} = useSocketContext()

    const conversations = useSelector((state) => state.sliceA.conversations);
  const messages = useSelector((state) => state.sliceA.messages)

    useEffect(() => {

      const handleNewMessage = (message) => {
        if (message.senderId === conversation._id) {
          if (selectedUser?._id !== message.senderId) {
            setUnseenMessages((prevCount) => prevCount + 1);
          } else if (selectedUser?._id === message.senderId) {
            updateSingleMessageAsSeen(message._id);
          }
        }
      };
    
      if (socket) {
        socket.on("newMessage", handleNewMessage);
      }
    
      return () => {
        if (socket) {
          socket.off("newMessage", handleNewMessage);
        }
      };
    }, [socket, conversation, conversations, selectedUser, messages]);
}

export default useCountUnseenMessage;
