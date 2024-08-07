import {
  createTextMessage,
  createFileMessage,
  loginUser,
  signupUser,
  logoutUser,
  fetchMessages,
  fetchConversations,
  deleteConversation,
  removeMessageForSender,
  removeMessageForAll,
  fetchUser,
} from "../api/index.js";

import {
  ADD_CONVERSATION_FROM_SEARCH,
  DELETE_CONVERSATION,
  GET_CONVERSATIONS,
  GET_MESSAGES,
  GET_MORE_MESSAGES,
  GET_REAL_TIME_MESSAGE,
  GET_REAL_TIME_MESSAGE_FROM_NEW,
  LOGIN_USER,
  LOGOUT_USER,
  REMOVE_MESSAGE_FOR_ALL,
  REMOVE_MESSAGE_FOR_SENDER,
  SELECT_USER_TO_MESSAGE,
  SEND_MESSAGE,
  SET_CONVERSATION_TO_TOP,
  SIGNUP_USER,
} from "../constants/actionType";

import {
  validateSignupInputs,
  validateLoginInputs,
} from "../validateForm/validateAuth";

import { axiosErrorHandiling } from "../utils/handleError.js";

export const signup = (inputs) => async (dispatch) => {
  const validationSuccess = validateSignupInputs(inputs);
  if (!validationSuccess) return;

  try {
    const { data } = await signupUser(inputs);

    dispatch({ type: SIGNUP_USER, payload: data.data.user });
    localStorage.setItem("chat-user", JSON.stringify(data.data.user));
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const login = (email, password) => async (dispatch) => {
  const successValidation = validateLoginInputs(email, password);
  if (!successValidation) return;

  try {
    const { data } = await loginUser(email, password);

    dispatch({ type: LOGIN_USER, payload: data.data.user });
    localStorage.setItem("chat-user", JSON.stringify(data.data.user));
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await logoutUser();

    localStorage.removeItem("chat-user");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    dispatch({ type: LOGOUT_USER, payload: null });
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const getConversations = () => async (dispatch) => {
  try {
    const { data } = await fetchConversations();

    dispatch({ type: GET_CONVERSATIONS, payload: data.data.conversations });
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const setConversation = (selectUser) => ({
  type: SET_CONVERSATION_TO_TOP,
  payload: selectUser,
});

export const addConversation = (selectedUser) => ({
  type: ADD_CONVERSATION_FROM_SEARCH,
  payload: selectedUser,
});

export const selectUser = (selectedUser) => ({
  type: SELECT_USER_TO_MESSAGE,
  payload: selectedUser,
});

export const getMessage = (selectedUserId) => async (dispatch) => {
  try {
    const { data } = await fetchMessages(selectedUserId, 1);
    if (data.length !== 0) {
      const messages = data.data.messages;
      let reverSeMessages = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        reverSeMessages.push(messages[i]);
      }
      dispatch({ type: GET_MESSAGES, payload: reverSeMessages });
    }
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const getMoreMessages = (selectedUserId, page, numberOfNewMessage) => async (dispatch) => {
  try {
    const { data } = await fetchMessages(selectedUserId, page, numberOfNewMessage);
    if (data.length !== 0) {
      const messages = data.data.messages;
      let reverSeMessages = [];
      for (let i = messages.length - 1; i >= 0; i--) {
        reverSeMessages.push(messages[i]);
      }
      dispatch({ type: GET_MORE_MESSAGES, payload: reverSeMessages });
    }
    return data.data;
  } catch (error) {
    console.log(error);
    axiosErrorHandiling(error);
  }
};

export const sendTextMessage =
  (messageData, receiverId) => async (dispatch) => {
    try {
      const { data } = await createTextMessage(messageData, receiverId);
      dispatch({ type: SEND_MESSAGE, payload: data.data.message });
    } catch (error) {
      axiosErrorHandiling(error);
    }
  };

export const sendFileMessage =
  (messageData, receiverId) => async (dispatch) => {
    try {
      const { data } = await createFileMessage(messageData, receiverId);
      dispatch({ type: SEND_MESSAGE, payload: data.data.message });
    } catch (error) {
      axiosErrorHandiling(error);
    }
  };

export const deleteConversationFromSidebar =
  (conversation) => async (dispatch) => {
    try {
      await deleteConversation(conversation._id);

      dispatch({ type: DELETE_CONVERSATION, payload: conversation });
    } catch (error) {
      axiosErrorHandiling(error);
    }
  };

export const removeMessageForSenderFromChat =
  (messageId) => async (dispatch) => {
    try {
      const { data } = await removeMessageForSender(messageId);
      dispatch({ type: REMOVE_MESSAGE_FOR_SENDER, payload: data.data.message });
    } catch (error) {
      console.log(error);
      axiosErrorHandiling(error);
    }
  };

export const removeMessageForAllFromChat =
  (messageId, reciverId) => async (dispatch) => {
    try {
      const { data } = await removeMessageForAll(messageId, reciverId);
      dispatch({ type: REMOVE_MESSAGE_FOR_ALL, payload: data.data.message });
    } catch (error) {
      axiosErrorHandiling(error);
    }
  };

export const realTimeMessage = (message, conversations) => async (dispatch) => {
  try {
    const conversation = conversations.filter(
      (conversation) => conversation._id === message.senderId
    );
    if (conversation.length === 0) {
      const { data } = await fetchUser(message.senderId);
      dispatch({
        type: GET_REAL_TIME_MESSAGE_FROM_NEW,
        payload: data.data.user,
      });
    } else {
      dispatch({ type: GET_REAL_TIME_MESSAGE, payload: message });
    }
  } catch (error) {
    axiosErrorHandiling(error);
  }
};

export const realtimeMessageRemoveFromAll = (message) => ({
  type: REMOVE_MESSAGE_FOR_ALL,
  payload: message,
});
