import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/messages/MessageContainer';
import SearchInput from '../../components/sidebar/SearchInput';
import Settings from '../../components/sidebar/Settings';
import Menu from '../../components/sidebar/Menu';
import { useStyleContext } from '../../context/StyleContext';
import useListenMessages from '../../hooks/useListenMessages';

const Home = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {isMobile, showMessages} = useStyleContext()

  useListenMessages()


  return (
    <>
      <div className={`flex ${isMobile && "h-[100%] w-[100%]"} sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-white`}>
        {(!isMobile || !showMessages) && (
          <Sidebar setIsSearchOpen={setIsSearchOpen} setIsSettingOpen={setIsSettingOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
        {(!isMobile || showMessages) && <MessageContainer />}
      </div>
      {isSearchOpen && <SearchInput setIsSearchOpen={setIsSearchOpen} />}
      {isSettingOpen && <Settings setIsSettingOpen={setIsSettingOpen} />}
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      {!isMobile && (
          <div
            className='fixed bottom-0 right-0 m-4 p-4  text-white rounded-full'
          >
            <p>Created By <span><a className=" text-[#DC0083] font-bold" href='https://www.linkedin.com/in/abdullah-al-rafi-234870282/'  target="_blank">Abdullah Al Rafi</a></span></p>
          </div>
        )}
    </>
  );
};

export default Home;
