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

export const updatePassword = (currentPassword, newPassword, confirmPassword) => {
  return (
    axios.patch(`${url}/auth/update-password`, { currentPassword, newPassword, confirmPassword }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
  )
}

export const deleteUser = (password) => {
  return (
    axios.delete(`${url}/users`, {
      data: {
        password
      },
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    },)
  )
}

export const logoutUser = () => {
  return axios.post(
    `${url}/auth/logout`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
};

export const forgetPassword = (email) => {
  return (
    axios.post(`${url}/auth/forget-password`, {email}, {
      headers: {"Content-Type": "application/json"}
    })
  )
}

export const validateOtp = (email, otp) => {
  return (
    axios.post(`${url}/auth/validate-otp`, {email, OTP: otp}, {
      headers: {"Content-Type" : "application/json"}
    })
  )
}

export const resetPassword = (email, password, confirmPassword) => {
  return (
    axios.post(`${url}/auth/reset-password`, {email, newPassword: password, confirmPassword}, {
      headers: {"Content-Type" : "application/json"}
    })
  )
}

export const fetchConversations = () =>
  axios.get(`${url}/users`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

export const fetchUsersForSearch = (queryStr) => {
  console.log(queryStr)
  return (axios.get(`${url}/users/search?query=${queryStr}`, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }));
};

export const createMessage = (messageData, receiverId, contentType) => {
  return axios.post(
    `${url}/messages/send/${receiverId}`,
    messageData,
    {
      headers: {
        "Content-Type": contentType,
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

export const removeMessageForSender = (messageId) => {
  return (
    axios.patch(`${url}/messages/remove/${messageId}`,{}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    })
  )
}

export const removeMessageForAll = (messageId, reciverId) => {
  return (
    axios.patch(`${url}/messages/remove-forAll/${messageId}/${reciverId}`,{}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    })
  )
}

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

export const fetchUser = (userId) => {
  return (
    axios.get(`${url}/users/user/${userId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
  })
  )
}

export const numberOfUnseenMessages = (senderId) => {
  return (
    axios.get(`${url}/messages/unseen-count/${senderId}`,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
  })
  )
}

export const resetUnseenMessages = (userId) => {
  return(
    axios.patch(`${url}/messages/mark-as-seen/${userId}`, {}, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
  })
  )
}

export const updateSingleMessageAsSeen = (messageId) => {
  return (
    axios.patch(`${url}/messages/mark-realTime-message-as-seen/${messageId}`, {}, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
  )
}
