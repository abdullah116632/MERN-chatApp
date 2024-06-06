import React from 'react';
import GenderCheckbox from './GenderCheckbox';


const SignUp = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-black'>
            Signup
            <span className='text-green-700'> ChatApp</span>
        </h1>
        
        <form>
          <div>
          <label className='label p-2'>
              <span className='text-base label-text text-slate-800'>Full Name</span>
            </label>
            <input type="text" placeholder='Enter your fullname' className='w-full input input-bordered h-10' />
          </div>

          <div>
          <label className='label p-2'>
              <span className='text-base label-text text-slate-800'>Username</span>
            </label>
            <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10' />
          </div>

          <div>
          <label className='label p-2'>
              <span className='text-base label-text text-slate-800'>password</span>
            </label>
            <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' />
          </div>

          <div>
          <label className='label p-2'>
              <span className='text-base label-text text-slate-800'>Confirm password</span>
            </label>
            <input type="password" placeholder='Enter password again' className='w-full input input-bordered h-10' />
          </div>

          <GenderCheckbox />

          <div>
            <button className='btn btn-block btn-sm mt-2'>Signup</button>
          </div>

          <a href="#" className='text-sm text-pink-900 hover:underline hover:text-slate-800 mt-2 inline-block'>
            Already have an account ?
          </a>
          
        </form>
      </div>
    </div>
  );
}

export default SignUp;
