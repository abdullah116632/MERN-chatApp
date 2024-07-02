import {
  SEND_MESSAGE,
  SIGNUP_USER,
  LOGOUT_USER,
  LOGIN_USER,
  SELECT_USER_TO_MESSAGE,
  GET_MESSAGES,
  GET_REAL_TIME_MESSAGE,
  GET_CONVERSATIONS,
  ADD_CONVERSATION_FROM_SEARCH,
  DELETE_CONVERSATION,
  UPDATE_USER,
  UPDATE_PASSWORD,
  DELETE_ACCOUNT,
  REMOVE_MESSAGE,
} from "../constants/actionType";

const initialState = {
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  conversations: [],
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

    case UPDATE_USER:
      return {
        ...state,
        authUser: action.payload
      }

    case UPDATE_PASSWORD:
      return {
        ...state,
        authUser: action.payload
      }

    case LOGOUT_USER:
      return {
        ...state,
        authUser: action.payload,
        conversations: [],
        selectedUserToMessage: null,
        messages: []
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

    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };

    case ADD_CONVERSATION_FROM_SEARCH:
      const updatedConversations = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: [action.payload, ...updatedConversations],
      };

    case DELETE_CONVERSATION:
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: [...filteredConversation],
      };

    case DELETE_ACCOUNT: 
      return {
        ...state,
        authUser: action.payload,
        conversations: [],
        selectedUserToMessage: null,
        messages: []
      }

    case REMOVE_MESSAGE: 
    const index = state.messages.findIndex(message => message._id === action.payload._id);
      if (index !== -1) {
        state.messages[index] = action.payload;
      }
      return {
        ...state,
        messages: [...state.messages],
      };

    default:
      return state;
  }
};

export default messageREducer;
