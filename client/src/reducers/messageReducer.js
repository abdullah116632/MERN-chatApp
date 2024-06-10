import {
  SEND_MESSAGE,
  SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  SELECT_USER_TO_MESSAGE,
  GET_MESSAGES,
  GET_REAL_TIME_MESSAGE,
} from "../constants/actionType";

const initialState = {
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  selectedUserToMessage: null,
  messages: [],
};

const messageREducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    case LOGIN_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    case SELECT_USER_TO_MESSAGE:
      return {
        ...state,
        selectedUserToMessage: action.payload,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };

    case GET_REAL_TIME_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    default:
      return state;
  }
};

export default messageREducer;
