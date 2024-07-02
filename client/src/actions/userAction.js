import toast from "react-hot-toast";
import { updateUser, updatePassword, deleteUser, resetPassword } from "../api/index.js";
import { DELETE_ACCOUNT, UPDATE_PASSWORD, UPDATE_USER } from "../constants/actionType";
import { validateUpdatePassInputs } from "../validateForm/validateAuth";


export const updateUserInfo =  (formData) => async (dispatch) => {
    try{
        const {data} = await updateUser(formData)
        localStorage.removeItem("chat-user")
        localStorage.setItem("chat-user", JSON.stringify(data.data.user));
        dispatch({type: UPDATE_USER, payload: data.data.user})
    }catch(error){
        toast.error(error.response.data.message)
    }
}

export const updatePass = (currentPass, newPass, confirmPass) => async (dispatch) => {
    const validationSuccess = validateUpdatePassInputs(currentPass, newPass, confirmPass)
    if(!validationSuccess) return;

    try{
        const {data} = await updatePassword(currentPass, newPass, confirmPass);
        dispatch({type: UPDATE_PASSWORD, payload: data.data.user})
        toast.success("Password updated successfully");
    }catch(error){
        toast.error(error.response.data.message)
    }
}

export const deleteAccount = (password) => async (dispatch) => {
    try{
        await deleteUser(password)
        
        localStorage.removeItem("chat-user")
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        dispatch({type: DELETE_ACCOUNT, payload: null})
        toast.success("Account deleted successfully")
    }catch(error){
        toast.error(error.response.data.message)
    }
}
