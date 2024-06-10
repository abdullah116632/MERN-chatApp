import {useState} from 'react';
import { TbLogout2 } from "react-icons/tb";
import {useDispatch} from "react-redux"
import { logout } from '../../actions/messageAction';

const LogoutButton = () => {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleClick = () => {
    setLoading(true)
    dispatch(logout())
    setLoading(false)
  }
  return (
    <div  className='mt-auto'>
        {
          !loading ? (
            <TbLogout2 className='w-6 h-6 text-white cursore-pointer mt-3' onClick={handleClick} />
          ) : <span className='loading loading-spinner'></span>
        }
    </div>
  );
}

export default LogoutButton;
