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
  SET_CONVERSATION_TO_TOP,
  REMOVE_MESSAGE_FOR_ALL,
  REMOVE_MESSAGE_FOR_SENDER,
  RESET_UNSEEN_MESSAGES,
  GET_REAL_TIME_MESSAGE_FROM_NEW,
  GET_MORE_MESSAGES,
} from "../constants/actionType";

const initialState = {
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  conversations: [],
  selectedUserToMessage: null,
  messages: [],
  numberOfNewMessage: 0
};

const messageReducer = (state = initialState, action) => {
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
        authUser: action.payload,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        authUser: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        authUser: action.payload,
        conversations: [],
        selectedUserToMessage: null,
        messages: [],
        numberOfNewMessage: 0
      };

    case SELECT_USER_TO_MESSAGE:
      return {
        ...state,
        selectedUserToMessage: action.payload,
        numberOfNewMessage: 0
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        numberOfNewMessage: state.numberOfNewMessage + 1
      };

    case GET_MESSAGES:
        return {
          ...state,
          messages: action.payload
        }
      
    case GET_MORE_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages]
      }

    case GET_REAL_TIME_MESSAGE:
      const {senderId} = action.payload
      
      const modifiedConversation = state.conversations.filter(
        (conversation) => conversation._id !== senderId
      );

      const tergatedConversation = state.conversations.filter(
        (conversation) => conversation._id === senderId
      )

      if (senderId === state.selectedUserToMessage?._id) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
          numberOfNewMessage: state.numberOfNewMessage + 1
        };
      }

      return {
        ...state,
        conversations: [...tergatedConversation, ...modifiedConversation],
      };

    case GET_REAL_TIME_MESSAGE_FROM_NEW: 
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
      }
      
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
        messages: [],
        numberOfNewMessage: 0
      };

    case SET_CONVERSATION_TO_TOP:
      const newConversations = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: [action.payload, ...newConversations],
      };

    case DELETE_CONVERSATION:
      const filteredConversation = state.conversations.filter(
        (conversation) => conversation._id !== action.payload._id
      );
      return {
        ...state,
        conversations: [...filteredConversation],
        selectedUserToMessage: null,
        messages: [],
        numberOfNewMessage: 0
      };

    case DELETE_ACCOUNT:
      return {
        ...state,
        authUser: action.payload,
        conversations: [],
        selectedUserToMessage: null,
        messages: [],
        numberOfNewMessage: 0
      };

    case REMOVE_MESSAGE_FOR_SENDER:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._id === action.payload._id
            ? { ...msg, removedBy: action.payload.removedBy }
            : msg
        ),
      };

    case REMOVE_MESSAGE_FOR_ALL:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._id === action.payload._id
            ? { ...msg, removedForEveryone: true }
            : msg
        ),
      };

    default:
      return state;
  }
};

export default messageReducer;