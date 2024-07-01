import {useState} from 'react';
import { TbLogout2 } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import {useDispatch} from "react-redux"
import { logout } from '../../actions/messageAction';

const LogoutButton = () => {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClick = async () => {
    setLoading(true)
    await dispatch(logout())
    setLoading(false)
  }
  return (
    <button className='mt-auto flex pb-2' onClick={handleClick}>
        {
          !loading ? (
            <IoMdLogOut className='w-6 h-6 cursore-pointer mt-3'  />
          ) : <span className='loading loading-spinner'></span>
        }
        <p className='self-center mt-2 ml-2'>Logout</p>
    </button>
  );
}

export default LogoutButton;
