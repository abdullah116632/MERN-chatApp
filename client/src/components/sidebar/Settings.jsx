import { ImCross } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Settings = ({ setIsSettingOpen }) => {

  const popupRef = useRef(null);


  const handleUpdatePassword = () => {
    // Handle the update password logic here
    console.log("Update Password clicked");
  };

  const handleUpdateSettings = () => {
    // Handle the update settings logic here
    console.log("Update Settings clicked");
  };

  const handlePrivacySettings = () => {
    console.log("Privacy Settings clicked");
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsSettingOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={popupRef} className="fixed h-64 w-52 bg-slate-800 top-96 left-[28.5%] rounded-md">
      <div className="flex justify-end">
        <ImCross
          className="cursor-pointer hover:text-red-500 mt-2 mr-2 text-sm"
          onClick={(e) => setIsSettingOpen(false)}
        />
      </div>
      <ul className="space-y-2 mt-2">
        <li
          className="hover:bg-stone-600 hover:text-red-300 cursor-pointer pl-2 font-semibold flex"
        >
          <Link to="/update-profile" className="flex w-full h-full">
          <CgProfile className="mr-2 mt-[2px] font-bold text-xl" />
          Your profile
          </Link>
        </li>
        <li
          className="hover:bg-stone-600 hover:text-red-300 cursor-pointer pl-2 font-semibold flex"
          onClick={handleUpdatePassword}
        >
          <RiLockPasswordFill className="mr-2 mt-[2px] font-bold text-xl" />
          Update password
        </li>
        <li
          className="hover:bg-stone-600 hover:text-red-300 cursor-pointer pl-2 font-semibold flex"
          onClick={handleUpdateSettings}
        >
          <AiOutlineUserDelete className="mr-2 mt-[2px] font-bold text-xl" />
          Delete profile
        </li>
      </ul>
    </div>
  );
};

export default Settings;
