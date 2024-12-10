import axios from "axios";

const API_URL = "http://localhost:4000"; 

// Login API
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

// Signup API
export const signup = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, password });
  return response.data;
};

// Fetch Products API
export const fetchProducts = async (token) => {
    console.log(token);
    
  const response = await axios.get(`${API_URL}/products/alldata/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
