import toast from "react-hot-toast";

export const validateSignupInputs = (inputs) => {
    const {email, password, confirmPassword, gender} = inputs;

    if(!email || !password || !gender){
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

export const validateLoginInputs = (email, password) => {
    if(!email){
        toast.error("Please enter email")
        return false
    }
    if(!password){
        toast.error("password is missing");
        return false;
    }

    return true;
}

export const validateUpdatePassInputs = (currentPass, newPass, confirmPass) => {
    if(!currentPass) {
        toast.error("Please inter current password")
        return false;
    }
    if(newPass !== confirmPass){
        toast.error("new password and confirm password must be same");
        return false;
    }

    return true;
}