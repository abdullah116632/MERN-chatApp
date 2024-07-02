import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/messageAction";


const LogoutPopup = ({setIsPopupOpen }) => {   

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    

    const handleClick = async () => {
        setLoading(true)
        await dispatch(logout())
        setLoading(false)
      }

  return (
    <div className=" h-24 w-60 rounded-lg bg-slate-800 absolute top-0 left-56 flex flex-col items-center">
      <p className="pt-2 text-lg">Are you sure ? </p>
      <div className="mt-4 w-full bg-zinc-800 flex justify-around">
        <button className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2" onClick={handleClick}>
        {
          loading ? (
            <span className='loading loading-spinner'></span>
          ) : "YES"
        }
        </button>
        <button
          className="hover:bg-slate-700 hover:text-black rounded h-full w-1/2"
          onClick={(e) => {
            setIsPopupOpen(false);
          }}
        >
          NO
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;
