import toast from "react-hot-toast";
import { createMessage, loginUser, signupUser, logoutUser, fetchMessages, fetchConversations, deleteConversation } from "../api";
import { ADD_CONVERSATION_FROM_SEARCH, DELETE_CONVERSATION, GET_CONVERSATIONS, GET_MESSAGES, GET_REAL_TIME_MESSAGE, LOGIN_USER, LOGOUT_USER, SELECT_USER_TO_MESSAGE, SEND_MESSAGE, SIGNUP_USER } from "../constants/actionType";
import { validateSignupInputs, validateLoginInputs } from "../validateForm/validateAuth";

export const signup = (inputs) => async (dispatch) => {
  const validationSuccess = validateSignupInputs(inputs)
  if(!validationSuccess) return;

  try{
    const {data} = await signupUser(inputs)
  
  dispatch({type: SIGNUP_USER, payload: data.data.user})
  localStorage.setItem("chat-user", JSON.stringify(data.data.user));

  }catch(error){
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An unexpected error occurred.');
    }
  }
}

export const login = (email, password) => async (dispatch) => {
  const successValidation = validateLoginInputs(email, password)
  if(!successValidation) return;

  try{
    const {data} = await loginUser(email, password);

    dispatch({type: LOGIN_USER, payload: data.data.user})
    localStorage.setItem("chat-user", JSON.stringify(data.data.user));
    
  }catch(error){
    const {data} = error.response;
    toast.error(data.message);
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

export const getConversations = () => async (dispatch) => {
  try{
    const {data} = await fetchConversations()

    dispatch({type: GET_CONVERSATIONS, payload: data.data.conversations})
  }catch(error){
    toast.error(error.response.data.message);
  }
}

export const addConversation = (selectedUser) => ({type: ADD_CONVERSATION_FROM_SEARCH, payload: selectedUser})

export const selectUser = (selectedUser) => ({type: SELECT_USER_TO_MESSAGE, payload: selectedUser})

export const getMessage = (selectedUserId) => async (dispatch) => {
  try{
  
    const {data} = await fetchMessages(selectedUserId);
    if(data.length !== 0){
      dispatch({type: GET_MESSAGES, payload: data.data.messages})
    }
    
  }catch(error){
    toast.error(error.response.data.message);
  }
}

export const sendMessage = (message, receiverId) => async (dispatch) => {
  try {
    const { data } = await createMessage(message, receiverId);
    dispatch({ type: SEND_MESSAGE, payload: data.data.message });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const deleteConversationFromSidebar = (conversation) => async (dispatch) => {
  try{
    await deleteConversation(conversation._id)
    

    dispatch({type: DELETE_CONVERSATION,  payload: conversation})
    console.log(conversation)
  }catch(error){
    toast.error(error.response.data)
  }
}

export const realTimeMessage = (message) => ({type: GET_REAL_TIME_MESSAGE, payload: message})


