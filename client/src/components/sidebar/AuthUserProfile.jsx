import { useSelector } from "react-redux";

const AuthUserProfile = () => {
    const authUser = useSelector((state) => state.sliceA.authUser)

  return (
      <div className="flex">
        
            <img alt='tailwind css chat bubble component' src={authUser.profilePic} className="w-12 h-12 rounded-full "/>
        
        <div className='ml-4 mt-1'>
          <span className='text-gray-900 text-xl font-bold'> {authUser.name}</span>
          </div>
        </div>
  );
}

export default AuthUserProfile;
