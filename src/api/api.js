import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const signUp = async (userData) => {
  try {
    console.log('API URL for sign-up:', `${API_BASE_URL}/users/signup`);
    const response = await axios.post(`${API_BASE_URL}/users/signup`, userData);

    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (userData) => {
  try {
    console.log('API URL for sign-in:', `${API_BASE_URL}/users/signin`);
    const response = await axios.post(`${API_BASE_URL}/users/signin`, userData);

    if (response.data && response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
