import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useStyleContext } from '../../context/StyleContext';

const MessageContainer = () => {
  const authUser = useSelector((state) => state.sliceA.authUser);
  const selectedUser = useSelector((state) => state.sliceA.selectedUserToMessage);
  const {isMobile, setShowMessages} = useStyleContext()

  return (
    <div className={` ${isMobile ? "w-full h-full" : "min-w-[30rem]"} flex flex-col `}>
      {!selectedUser ? <NoChatSelected name={authUser.name} /> : (
        <>
          <div className={`bg-slate-500 w-full ${!isMobile && "px-4"} py-2 flex items-center`}>
          {
            isMobile && <FaArrowLeft className='w-8 text-white hover:cursor-pointer hover:text-slate-200 ' onClick={(e) => setShowMessages(false)}/>
          }
            <img
              alt='user profile'
              className='w-10 h-10 rounded-full object-cover' 
              src={selectedUser.profilePic}
            />
            <div className={`ml-2 mt-1 pb-2`}>
              <span className='text-gray-900 text-xl font-bold'> {selectedUser.name}</span>
            </div>
          </div>

          <Messages />

          <MessageInput />
          
        </>
      )}
    </div>
  );
}

export default MessageContainer;

const NoChatSelected = ({ name }) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p className='text-slate-900 text-2xl font-semibold'>
          Welcome, <span className='text-red-900'>{name}.</span>
        </p>
        <p className='text-slate-900 font-semibold'>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center text-blue-600'/>
      </div>
    </div>
  );
}
