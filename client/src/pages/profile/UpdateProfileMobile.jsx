import { useState} from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import GenderCheckbox from "../signup/GenderCheckbox";
import { updateUserInfo } from "../../actions/userAction";

const UpdateProfileMobile = () => {
  const authUser = useSelector((state) => state.sliceA.authUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: authUser.name,
    email: authUser.email,
    profilePic: authUser.profilePic,
    gender: authUser.gender,
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCheckboxChange = (gender) => {
    setUser({ ...user, gender });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUser({ ...user, profilePic: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("gender", user.gender);
    if (selectedFile) {
      formData.append("profilePic", selectedFile);
    }

    await dispatch(updateUserInfo(formData));
    setLoading(false);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="container backdrop-blur-lg rounded-lg border mx-auto p-4 text-gray-900 font-bold w-full sm:w-[65%]">
      <h2 className="text-3xl font-bold mb-4 text-center">Profile</h2>
      {!editMode ? (
        <>
          <div className="flex flex-col items-center gap-3">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="flex flex-col items-start w-full">
              <label className="text-lg">Name:</label>
              <div className="w-full p-2 border border-emerald-900 rounded">
                {user.name}
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-lg">Email:</label>
              <div className="w-full p-2 border border-emerald-900 rounded">
                {user.email}
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-lg">Gender:</label>
              <div className="w-full p-2 border border-emerald-900 rounded">
                {user.gender}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={toggleEditMode}
              className="px-4 py-2 bg-blue-500 text-white rounded flex"
            >
              <MdEdit className="mt-1 mr-1" />
              Edit Profile
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-500 text-white rounded ml-4"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label htmlFor="fileInput">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-16 h-16 rounded-full cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-lg">Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-slate-200 border-stone-900"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-lg">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-slate-200 border-stone-900"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <label className="text-lg">Gender:</label>
            <GenderCheckbox
              onCheckboxChange={handleCheckboxChange}
              selectedGender={user.gender}
            />
          </div>

          <div className="flex justify-end">
            <button
              disabled={loading}
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              onClick={toggleEditMode}
              className="px-4 py-2 bg-red-500 text-white rounded ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProfileMobile;
