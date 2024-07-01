import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import {useDispatch } from "react-redux";
import { signup } from "../../actions/messageAction";
import toast from "react-hot-toast";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (gender) => {
    setInputs({...inputs, gender})
  }

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(signup(inputs));

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 max-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Signup
          <span className="text-green-700"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered h-10"
              value={inputs.name}
              onChange={(e) => setInputs({...inputs, name: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered h-10"
              value={inputs.email}
              onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
          </div>


          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                Confirm password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password again"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender={inputs.gender} />

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {
                loading ? <span className="loading loading-spinner"></span> : "Sign Up"
              }
            </button>
          </div>

          <Link
            to="/login"
            className="text-sm text-pink-900 hover:underline hover:text-slate-800 mt-2 inline-block"
          >
            Already have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
