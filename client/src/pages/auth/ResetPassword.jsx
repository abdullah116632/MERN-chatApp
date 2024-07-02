import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../api';
import { axiosErrorHandiling } from '../../utils/handleError';
import { useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location)
  
  const { email } = location.state || {}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!passwords){
        toast.error("Please enter password")
        return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('password and confirm password must be same');
      return;
    }
    setLoading(true);
    try {
      console.log(email, passwords.newPassword, passwords.confirmPassword)
      const {data} = await resetPassword(email, passwords.newPassword, passwords.confirmPassword)
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      axiosErrorHandiling(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Reset <span className="text-red-700">Password</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">New Password</span>
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="w-full input input-bordered h-10"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="w-full input input-bordered h-10"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-block btn-sm mt-2 bg-green-600 text-white" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
