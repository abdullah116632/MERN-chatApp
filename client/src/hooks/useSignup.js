import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const api = "http://localhost:8000"

const useSignup = () => {
    const [loading, setLoading] = useState(false);

    const {setAuthUser} = useAuthContext()

    const signup = async ({fullName, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        if(!success) return;

        setLoading(true);
        
        try{
            const res = await fetch(`${api}/api/auth/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({fullName, username, password, confirmPassword, gender})
            })
            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            console.log(data);
            setAuthUser(data)
            
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, signup}
}

export default useSignup;


function handleInputErrors({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !gender){
        toast.error("Please fill all the fields")
        return false
    }

    if(password !== confirmPassword){
        toast.error("Password and Confirm password must be same")
        return false;
    }

    if(password.length < 6 ){
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
