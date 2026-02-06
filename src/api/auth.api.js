import axios from 'axios';

const API_URL = 'http://localhost:5000/';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}users/authenticate`, {
      email: email,
      password: password
    });
    // According to your screenshot, success returns { status: "success", ... }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server Error");
  }
};