//frontend\src\services\userService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users/users/";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}${id}/`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}${id}/`);
  return response.data;
};
