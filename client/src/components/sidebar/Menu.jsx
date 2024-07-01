import { IoCloseCircleSharp } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import LogoutButton from "./LogoutButton"
import { useRef, useEffect } from "react";

const Menu = ({setIsMenuOpen}) => {

  const popupRef = useRef(null);


  const handleCreateGroup = () => {

  }


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div ref={popupRef} className="fixed h-64 w-52 bg-slate-800 top-96 left-[32.5%] rounded-md">
      <div className="flex justify-end">
        <IoCloseCircleSharp
          className="cursor-pointer hover:text-red-500 mt-2 mr-2 text-2xl"
          onClick={(e) => setIsMenuOpen(false)}
        />
      </div>
      <ul>
        <li className="hover:bg-stone-600 hover:text-red-300 cursor-pointer pl-2 font-semibold flex my-1" onClick={handleCreateGroup}>
          <HiUserGroup className="mr-2 mt-[2px] font-bold text-2xl pb-1" />
          Create group
        </li>
        <li className="hover:bg-stone-600 hover:text-red-300 cursor-pointer pl-2 font-semibold flex">
          <LogoutButton />
        </li>

      </ul>
    </div>
  );
}

export default Menu;
