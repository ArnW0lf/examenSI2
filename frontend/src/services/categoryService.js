// frontend/src/services/categoryService.js
import axios from "axios";

// URL base de la API
const API_URL = "http://127.0.0.1:8000/api/categories/";

/**
 * Obtener todas las categorías
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // devuelve un array de categorías
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/**
 * Obtener categoría por ID
 * @param {number} id
 */
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

/**
 * Crear nueva categoría
 * @param {object} categoryData
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

/**
 * Actualizar categoría existente
 * @param {number} id
 * @param {object} categoryData
 */
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar categoría
 * @param {number} id
 */
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category ${id}:`, error);
    throw error;
  }
};
