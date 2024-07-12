import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { FaFileImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { sendTextMessage, sendFileMessage, setConversation } from "../../actions/messageAction";


const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const receiver = useSelector((state) => state.sliceA.selectedUserToMessage)

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!message && !file) return;
    setLoading(true)

    if (!file) {
      dispatch(sendTextMessage(message, receiver._id));
    } else {
      const formData = new FormData();
      formData.append("messageFile", selectedFile);
      await dispatch(sendFileMessage(formData, receiver._id));
    }
    dispatch(setConversation(receiver));
    setMessage("");
    setFile(null);
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <form className="px-4 my-3 mt-auto" onSubmit={handleSubmit}>
      <div className="w-full flex rounded-lg border bg-gray-700 border-gray-600 text-white">
        <input
          type="text"
          disabled={file ? true : false}
          className=" focus:outline-none  text-sm  block w-full p-2.5 rounded-lg bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex relative">
          {
            file && <img className="absolute h-16 bottom-12 rounded-md right-8" src={file} />
          }
        <label htmlFor="file-upload" className=" flex items-center pl-3 pr-3 cursor-pointer">
          <span className="text-gray-400 hover:text-white">
            <FaFileImage />
          </span>
        </label>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          name="message"
          onChange={handleFileChange}
        />
        
        <button
          type="submit"
          className="flex items-center pe-3 text-gray-400 hover:text-white"
        >
          {loading ? <span className="loading loading-spinner"></span> : <IoIosSend /> }
        </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
