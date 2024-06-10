import axios from "axios";

const url = "http://localhost:8000/api";

export const signupUser = (inputs) => {
  // const {fullName, username, password, confirmPassword, gender} = inputs;
  return axios.post(`${url}/auth/signup`, inputs, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const loginUser = (username, password) => {
  return axios.post(
    `${url}/auth/login`,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const logoutUser = () => {
  return axios.post("http://localhost:8000/api/auth/logout", {}, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  });
};

export const fetchUsers = () => (
  axios.get(`${url}/users`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  })
)

export const createMessage = (message, receiverId) => {
  return (axios.post(`${url}/messages/send/${receiverId}`, {message}, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }))};

export const fetchMessages = (selectedUserId) => (
  axios.get(`${url}/messages/${selectedUserId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })
)
