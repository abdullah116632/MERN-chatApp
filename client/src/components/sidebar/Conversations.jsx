import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation";
import toast from "react-hot-toast";
import { MdPersonSearch } from "react-icons/md";
import { getConversations } from "../../actions/messageAction";
import useListenMessages from "../../hooks/useListenMessages";

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);

  useListenMessages()
  const dispatch = useDispatch()
  const conversations = useSelector((state) => state.sliceA.conversations);


  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        dispatch(getConversations());
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleOptionsOpen = (id) => {
    setActiveConversation((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="py-2 flex flex-col overflow-auto min-w-72">
      {conversations.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
        <p className="text-slate-800 text-2xl font-semibold">
          To start conversation 
        </p>
        <p className="text-slate-800 font-semibold justify-center items-start pb-3">search people in searcbar</p>
        <MdPersonSearch className='text-3xl md:text-6xl text-center text-blue-600'/>
        </div>
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
            isOptionsOpen={activeConversation === conversation._id}
            handleOptionsOpen={() => handleOptionsOpen(conversation._id)}
          />
        ))
      )}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
