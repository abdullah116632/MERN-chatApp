import toast from "react-hot-toast";

export const validateSignupInputs = (inputs) => {
    const {fullName, username, password, confirmPassword, gender} = inputs;

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

export const validateLoginInputs = (username, password) => {
    if(!username || !password ){
        toast.error("Please fill all the fields")
        return false
    }

    return true;
}