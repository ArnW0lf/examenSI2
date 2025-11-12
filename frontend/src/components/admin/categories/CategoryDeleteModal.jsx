// frontend/src/components/categories/CategoryDeleteModal.jsx
import React from "react";

const CategoryDeleteModal = ({ categoryId, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Eliminar categoría</h2>
        <p className="mb-6">
          ¿Estás seguro de que deseas eliminar la categoría con ID {categoryId}?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;
