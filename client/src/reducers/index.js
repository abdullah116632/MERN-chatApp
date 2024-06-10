import { combineReducers } from "redux";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({sliceA: messageReducer});

export default rootReducer;

