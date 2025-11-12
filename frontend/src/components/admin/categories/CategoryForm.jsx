// frontend/src/components/categories/CategoryForm.jsx
import React, { useEffect, useState } from "react";

const CategoryForm = ({ editingCategory, onSave }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (editingCategory) {
      setName(editingCategory.name);
      setSlug(editingCategory.slug);
      setDescription(editingCategory.description || "");
      setIsActive(editingCategory.is_active);
    } else {
      setName("");
      setSlug("");
      setDescription("");
      setIsActive(true);
    }
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, slug, description, is_active: isActive });
  };

  return (
    <form
      className="mb-4 p-4 border rounded bg-gray-50"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-2">
        {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
      </h2>
      <div className="mb-2">
        <label className="block mb-1">Nombre</label>
        <input
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Slug</label>
        <input
          className="border p-2 w-full rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Descripción</label>
        <textarea
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mr-2"
          />
          Activa
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingCategory ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
};

export default CategoryForm;
