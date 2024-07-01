import toast from "react-hot-toast";
import { updateUser } from "../api";
import { UPDATE_USER } from "../constants/actionType";


export const updateUserInfo =  (formData) => async (dispatch) => {
    try{
        const {data} = await updateUser(formData)
        localStorage.removeItem("chat-user")
        localStorage.setItem("chat-user", JSON.stringify(data.data.user));
        console.log(data)
        dispatch({type: UPDATE_USER, payload: data.data.user})
    }catch(error){
        console.log(error)
    }
}