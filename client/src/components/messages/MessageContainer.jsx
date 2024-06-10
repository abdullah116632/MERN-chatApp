import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux';



const MessageContainer = () => {
  const authUser = useSelector((state) => state.sliceA.authUser)
  const selectedUser = useSelector((state) => state.sliceA.selectedUserToMessage)

  return (
    <div className='md:min-w-[450px] flex flex-col max-w-14'>
      {!selectedUser ? <NoChatSelected name={authUser.fullName} /> : (
        <>
        <div className='bg-slate-500 px-4 py-2 flex'>
        <span className='w-10 rounded-full'>
            <img alt='tailwind css chat bubble component' src={selectedUser.profilePic} />
        </span>
        <div className='ml-2 mt-1'>
          <span className='text-gray-900 text-xl font-bold'> {selectedUser.fullName}</span>
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


const NoChatSelected = ({name}) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p className=' text-slate-900 text-2xl font-semibold'>Welcome {name}.</p>
        <p className=' text-slate-900 font-semibold'>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center text-blue-600'/>
      </div>
    </div>
  )
}