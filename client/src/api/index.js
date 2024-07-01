import axios from "axios";

const url = "http://localhost:8000/api";

export const signupUser = (inputs) => {
  // const {name, email, password, confirmPassword, gender} = inputs;
  console.log(inputs);
  return axios.post(`${url}/auth/signup`, inputs, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const loginUser = (email, password) => {
  return axios.post(
    `${url}/auth/login`,
    { email, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const updateUser = (userObj) => {
  return (
    axios.patch(`${url}/users`, userObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
  )
}

export const logoutUser = () => {
  return axios.post(
    "http://localhost:8000/api/auth/logout",
    {},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
};

export const fetchConversations = () =>
  axios.get(`${url}/users`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const fetchUsersForSearch = (queryStr) => {
  return (axios.get(`${url}/users/search?query=${queryStr}`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }));
};

export const createMessage = (message, receiverId) => {
  return axios.post(
    `${url}/messages/send/${receiverId}`,
    { message },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const fetchMessages = (selectedUserId) =>
  axios.get(`${url}/messages/${selectedUserId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
});

export const deleteConversation = (userId) => {
  return (
    axios.delete(`${url}/messages/${userId}`,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
  })
  )
}
