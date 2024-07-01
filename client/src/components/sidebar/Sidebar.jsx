import Conversations from './Conversations';
import AuthUserProfile from './AuthUserProfile';
import { FaSearch } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";


const Sidebar = ({setIsSearchOpen, setIsSettingOpen, setIsMenuOpen}) => {


  return (
    <div className='border-r border-slate-500 p-4 flex flex-col min-w-28 relative z-10'>
      <div className='flex'>
      <AuthUserProfile />
      <button onClick={(e) => setIsSearchOpen(true)} className="btn btn-circle bg-sky-500 text-white ml-auto">
        <FaSearch className="w-5 h-5 outline-none" />
      </button>
      </div>
      <div className='divider px-3 border-t border-slate-700'></div>
      
      <Conversations />
      <div className='mt-auto flex'>
      <IoSettingsSharp className='w-6 h-6 text-white cursore-pointer' onClick={(e) => setIsSettingOpen(true)} />
      <GiHamburgerMenu className='w-6 h-6 text-white cursor-pointer ml-10' onClick={(e) => setIsMenuOpen(true)}/>
      </div>
    </div>
  );
}

export default Sidebar;
