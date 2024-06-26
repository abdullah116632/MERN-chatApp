import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import './App.css'
import Home from './pages/home/Home'
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import { useSelector } from 'react-redux'
import UpdateProfile from './pages/profile/UpdateProfile'


function App() {
  const authUser = useSelector((state) => state.sliceA.authUser)

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" /> } />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp /> } />
        <Route path="/update-profile" element={<UpdateProfile />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
