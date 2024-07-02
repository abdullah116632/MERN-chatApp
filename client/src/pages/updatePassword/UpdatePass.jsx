import{ useState } from "react";
import { useDispatch } from "react-redux";

import { updatePass } from "../../actions/userAction";
// import { updatePassword } from "../../actions/userAction"; // Assume you have this action

const UpdatePass = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      await dispatch(updatePass(passwords.currentPassword, passwords.newPassword, passwords.confirmPassword));
      setLoading(false);
  };



  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Update <span className="text-green-700">Password</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label pt-2">
              <span className="text-base label-text text-slate-800">Current Password</span>
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              className="w-full input input-bordered h-10"
              value={passwords.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label">
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
              <span className="text-base label-text text-slate-800">Confirm New Password</span>
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
          <div className="py-3">
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Change"}
            </button>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePass;
