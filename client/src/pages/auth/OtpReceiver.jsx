import React, { useState } from 'react';
import axios from 'axios';
import ResetPassword from './ResetPassword';
import { forgetPassword, validateOtp } from '../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosErrorHandiling } from '../../utils/handleError';


const OtpReceiver = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [loadingValidate, setLoadingValidate] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false)
  const navigate = useNavigate()

  const handleValidateOtp = async () => {
    if(!otp){
      toast.error("Please enter OTP")
      return;
    }
    try {
      setLoadingValidate(true)
      const {data} = await validateOtp(email, otp);
      navigate("/reset-password", { state: { email }})
    } catch (error) {
      axiosErrorHandiling(error)
    }finally{
      setLoadingValidate(false)
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoadingResend(true)
      const {data} = await forgetPassword(email)
      toast.success('OTP sent to your email.');
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }finally{
      setLoadingResend(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Enter that <span className="text-red-700">OTP,</span><br /> we sent in your Email
        </h1>
            <div className='my-3'>
              <label className="label p-2">
                <span className="text-base label-text text-slate-800">OTP</span>
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full input input-bordered h-10"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button onClick={handleValidateOtp} className="btn btn-block btn-sm my-2 bg-green-600 text-white" disabled={loadingValidate}>
            {
                loadingValidate ? <span className="loading loading-spinner"></span> : "Validate OTP"
              }
            </button>
            <button onClick={handleResendOtp} className="btn btn-block btn-sm mt-2 bg-yellow-600 text-white" disabled={loadingResend}>
            {
                loadingResend ? <span className="loading loading-spinner"></span> : "Resend OTP"
              }
            </button>
      </div>
    </div>
  );
};

export default OtpReceiver;
