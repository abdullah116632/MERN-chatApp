import { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import SearchInput from '../../components/sidebar/SearchInput';
import Settings from '../../components/sidebar/Settings';
import Menu from '../../components/sidebar/Menu';

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-white'>
      <Sidebar setIsSearchOpen={setIsSearchOpen} setIsSettingOpen={setIsSettingOpen} setIsMenuOpen={setIsMenuOpen}/>
      <MessageContainer />
    </div>
      {
        isSearchOpen && <SearchInput setIsSearchOpen={setIsSearchOpen} />
        
      }
      {
        isSettingOpen && <Settings setIsSettingOpen={setIsSettingOpen} />
      }
      {
        isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />
      }
    </>
  );
}


export default Home;
