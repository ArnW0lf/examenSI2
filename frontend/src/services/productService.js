import axios from "axios";

const API_URL = "http://localhost:8000/api/products/";

export const getProducts = async (params = {}) => {
  const response = await axios.get(`${API_URL}products/`, { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}categories/`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(`${API_URL}products/`, data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`${API_URL}products/${id}/`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}products/${id}/`);
  return response.data;
};