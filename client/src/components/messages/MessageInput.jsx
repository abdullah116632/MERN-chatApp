import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../actions/messageAction";
import toast from "react-hot-toast";


const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const receiverId = useSelector((state) => state.sliceA.selectedUserToMessage._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!message) return;
    try{
      setLoading(true)
      dispatch(sendMessage(message, receiverId))
      setLoading(false)
      setMessage("");
    }catch(err){
      toast.error(err.response.data.error);
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <form className="px-4 my-3 mt-auto" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className=" focus:outline-none border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <span className="loading loading-spinner"></span> : <IoIosSend /> }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
