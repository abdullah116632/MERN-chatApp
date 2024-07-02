import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import DeleteProfilePopup from "./DeleteProfilePopup";

const DeleteProfile = () => {

  const [password, setPassword] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!password){
      toast.error("Please enter password")
      return;
    }
    setIsPopupOpen(true)
  };



  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className={`w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ${isPopupOpen ? " bg-white" : ''}`}>
        <h1 className="text-3xl font-semibold text-center text-black">
          Delete <span className="text-red-700">Profile</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-block btn-sm mt-2 bg-red-600 text-white">
               Delete Profile
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
      {
        isPopupOpen && <DeleteProfilePopup setIsPopupOpen={setIsPopupOpen} password={password} />
      }
    </div>
  );
};

export default DeleteProfile;
