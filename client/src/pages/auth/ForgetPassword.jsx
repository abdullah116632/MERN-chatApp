import { useState } from 'react';
import OtpReceiver from './OtpReceiver';
import toast from 'react-hot-toast';
import { forgetPassword } from '../../api';
import { axiosErrorHandiling } from '../../utils/handleError';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    if(!email){
      toast.error("Please enter email")
      return;
    }

    try {
      setLoading(true)
      const {data} = await forgetPassword(email)
      setOtpSent(true);
      toast.success('OTP have sent to your email.');
    } catch (error) {
      axiosErrorHandiling(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        
        {!otpSent ? (
          <>
          <h1 className="text-3xl font-semibold text-center text-black">
          To reset password <br /> enter your <span className=" text-emerald-800">Email</span>
        </h1>
            <div className='mb-5'>
              <label className="label p-2">
                <span className="text-base label-text text-slate-800">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full input input-bordered h-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={handleSendOtp} className="btn btn-block btn-sm mt-2 bg-blue-600 text-white" disabled={loading}>
            {
                loading ? <span className="loading loading-spinner"></span> : "Send OTP"
              }
            </button>
          </>
        ) : (
          <OtpReceiver email={email} />
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
