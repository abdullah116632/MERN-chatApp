import { useCallback, useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getMoreMessages } from "../../actions/messageAction";
import { useStyleContext } from "../../context/StyleContext";


const Messages = () => {
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.sliceA.selectedUserToMessage)
  const messages = useSelector((state) => state.sliceA.messages)
  const numberOfNewMessage = useSelector((state) => state.sliceA.numberOfNewMessage)
  console.log(numberOfNewMessage)

  const messageContainerRef = useRef();

  const fetchMoreMessages = useCallback(
    async (page, numberOfNewMessage) => {
      setLoading(true);
      const data = await dispatch(getMoreMessages(user._id, page, numberOfNewMessage));
      setLoading(false);

      if (data?.messages.length === 0) {
        setHasMore(false);
      }
    },
    [dispatch, user]
  );

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop === 0 && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchMoreMessages(page, numberOfNewMessage);
    }
  }, [page, fetchMoreMessages]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    messageContainer.addEventListener("scroll", handleScroll);
    return () => {
      messageContainer.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    setLoading(true);
    dispatch(getMessage(user._id));
    setPage(1)
    setLoading(false);
  },[user?._id])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className={`pl-1 overflow-auto`} ref={messageContainerRef}>
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div key={message._id} >
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
