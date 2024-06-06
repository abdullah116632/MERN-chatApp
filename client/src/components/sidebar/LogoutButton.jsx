import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {

  const {loading, logout} = useLogout()
  return (
    <div>
      <div className='mt-auto'>
        {
          !loading ? (
            <TbLogout2 className='w-6 h-6 text-white cursore-pointer mt-3' onClick={logout} />
          ) : <span className='loading loading-spinner'></span>
        }
      </div>
    </div>
  );
}

export default LogoutButton;
