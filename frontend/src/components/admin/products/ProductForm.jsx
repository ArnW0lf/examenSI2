// src/components/admin/products/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getCategories, createProduct, updateProduct } from "../../../services/productService";

/**
 * ProductForm
 * Componente modal para crear o editar un producto.
 * - Si `product` existe: se trata de edición.
 * - Si `product` es null: se trata de creación.
 *
 * Props:
 * - product: objeto producto a editar (opcional)
 * - onClose: función para cerrar el modal
 * - onSuccess: función a ejecutar después de guardar (para recargar la lista)
 */
export default function ProductForm({ product, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    category_id: "", // 🔹 clave primaria de categoría, usada por el serializer
    base_price: "",
    is_featured: false,
  });

  const [categories, setCategories] = useState([]); // lista de categorías del backend
  const [loading, setLoading] = useState(false);    // estado de envío del formulario

  // Traer categorías y llenar el formulario si estamos editando
  useEffect(() => {
    getCategories().then((data) => setCategories(data));

    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        short_description: product.short_description || "",
        category_id: product.category?.id || "",
        base_price: product.base_price || "",
        is_featured: product.is_featured || false,
      });
    }
  }, [product]);

  // Maneja cambios de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        // Actualizar producto existente
        await updateProduct(product.id, formData);
      } else {
        // Crear nuevo producto
        await createProduct(formData);
      }
      onSuccess(); // recarga la lista de productos
      onClose();   // cierra el modal
    } catch (error) {
      console.error("Error guardando producto:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {product ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre */}
          <input
            type="text"
            name="name"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          {/* Slug */}
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          {/* Descripción larga */}
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          {/* Descripción corta */}
          <input
            type="text"
            name="short_description"
            placeholder="Descripción corta"
            value={formData.short_description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          {/* Selección de categoría */}
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Selecciona categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Precio base */}
          <input
            type="number"
            name="base_price"
            placeholder="Precio base"
            value={formData.base_price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          {/* Producto destacado */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
            />
            Destacado
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}
