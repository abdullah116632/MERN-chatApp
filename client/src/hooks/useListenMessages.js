import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { realTimeMessage, realtimeMessageRemoveFromAll } from "../actions/messageAction";


const useListenMessages = () => {
    const {socket} = useSocketContext()
    const dispatch = useDispatch()
    const messages = useSelector((state) => state.sliceA.messages)
    const conversations = useSelector((state) => state.sliceA.conversations)

    useEffect(() => {
        
        socket?.on("newMessage", (newMessage) => {
            dispatch(realTimeMessage(newMessage, conversations));
        })

        socket?.on("removedMessageForAll", (removedMessage) => {
            dispatch(realtimeMessageRemoveFromAll(removedMessage))
        })

        return () => socket?.off("newMessage")
    },[socket, dispatch, messages, conversations])
}

export default useListenMessages;
