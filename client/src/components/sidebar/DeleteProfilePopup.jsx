import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";


const DeleteProfilePopup = ({setIsPopupOpen, password}) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const handleClick = async () => {
        setLoading(true)
        await dispatch(deleteAccount(password))
        setLoading(false)
        navigate('/login');
      }

  return (
    <div className=" h-44 w-96 rounded-lg bg-slate-800 text-slate-200 absolute left-[37.5%] top-[40%] flex flex-col items-center">
      <p className="pt-2 text-lg ">Are you sure ? </p>
      <p className="pt-2 text-lg">To delete your account</p>
      <div className="mt-8 w-full h-12 bg-zinc-800 flex justify-around">
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

export default DeleteProfilePopup;
