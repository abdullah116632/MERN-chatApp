import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
import { useDispatch, useSelector } from "react-redux";
import { realTimeMessage } from "../actions/messageAction";



const useListenMessages = () => {
    const {socket} = useSocketContext()
    // const {messages, setMessages} = useConversation()
    const dispatch = useDispatch()
    const messages = useSelector((state) => state.sliceA.messages)

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            dispatch(realTimeMessage(newMessage));
        })

        return () => socket?.off("newMessage")
    },[socket, dispatch, messages])
}

export default useListenMessages;
