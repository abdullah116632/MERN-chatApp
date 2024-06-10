import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index.js";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
