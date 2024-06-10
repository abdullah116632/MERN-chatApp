import { useEffect, useState } from 'react';
import Conversation from './Conversation';
import { fetchUsers } from '../../api';
import toast from 'react-hot-toast';

const Conversations = () => {

  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try{
        const {data} = await fetchUsers();
        setConversations(data);
        setLoading(false)
      }catch(error){
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    getUsers();
  },[])


  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {
        conversations.map((conversation, idx) => (
          <Conversation 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
          />
        ))
      }
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
}

export default Conversations;
