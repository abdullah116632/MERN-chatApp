import toast from "react-hot-toast";
import { createMessage, loginUser, signupUser, logoutUser, fetchMessages } from "../api";
import { GET_MESSAGES, GET_REAL_TIME_MESSAGE, LOGIN_USER, LOGOUT_USER, SELECT_USER_TO_MESSAGE, SEND_MESSAGE, SIGNUP_USER } from "../constants/actionType";
import { validateSignupInputs, validateLoginInputs } from "../validateForm/validateAuth";

export const signup = (inputs) => async (dispatch) => {
  const validationSuccess = validateSignupInputs(inputs)
  if(!validationSuccess) return;

  try{
    const {data} = await signupUser(inputs)  
  //   if(data.error){
  //     throw new Error(data.error);
  // }
  
  dispatch({type: SIGNUP_USER, payload: data})
  localStorage.setItem("chat-user", JSON.stringify(data));

  }catch(error){
    const {data} = error.response;
    toast.error(data.error);
  }
}

export const login = (username, password) => async (dispatch) => {
  const successValidation = validateLoginInputs(username, password)
  if(!successValidation) return;

  try{
    const {data} = await loginUser(username, password);

    dispatch({type: LOGIN_USER, payload: data})
    localStorage.setItem("chat-user", JSON.stringify(data));
    
  }catch(error){
    console.log(error)
    const {data} = error.response;
    toast.error(data.error);
  }
}

export const logout = () => async (dispatch) => {
  try{
    const {data} = await logoutUser();

    localStorage.removeItem("chat-user")
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    dispatch({type: LOGOUT_USER, payload: null})
  }catch(error){
    console.log(error)
    toast.error(error.response.data.error);
  }
}

export const selectUser = (selectedUser) => ({type: SELECT_USER_TO_MESSAGE, payload: selectedUser})

export const getMessage = (selectedUserId) => async (dispatch) => {
  try{
  
    const {data} = await fetchMessages(selectedUserId);

    dispatch({type: GET_MESSAGES, payload: data})
  }catch(error){
    toast.error(error.response.data.error);
  }
}

export const sendMessage = (message, receiverId) => async (dispatch) => {
  try {
    const { data } = await createMessage(message, receiverId);
    dispatch({ type: SEND_MESSAGE, payload: data });
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const realTimeMessage = (message) => ({type: GET_REAL_TIME_MESSAGE, payload: message})


