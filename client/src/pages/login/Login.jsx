import { useState } from "react";
import { Link } from "react-router-dom";
// import useLogin from "../../hooks/useLogin";
import {useDispatch} from "react-redux"
import { login } from "../../actions/messageAction";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(login(email, password));
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-black">
          Login
          <span className="text-green-700"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-slate-800">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </div>

          <Link
            to="/signup"
            className="text-sm text-pink-900 hover:underline hover:text-slate-800 mt-2 inline-block"
          >
            {"Don't"} have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
