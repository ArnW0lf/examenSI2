// src/components/admin/products/ProductDeleteModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import { deleteProduct } from "../../../services/productService";

export default function ProductDeleteModal({ product, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProduct(product.id);
      onSuccess();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Eliminar Producto</h2>
        <p>¿Estás seguro de eliminar "{product.name}"?</p>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
