// frontend/src/components/categories/CategoryList.jsx
import React from "react";
import { Edit, Trash2 } from "lucide-react";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border">ID</th>
          <th className="py-2 px-4 border">Nombre</th>
          <th className="py-2 px-4 border">Slug</th>
          <th className="py-2 px-4 border">Descripción</th>
          <th className="py-2 px-4 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <tr key={cat.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border">{cat.id}</td>
            <td className="py-2 px-4 border">{cat.name}</td>
            <td className="py-2 px-4 border">{cat.slug}</td>
            <td className="py-2 px-4 border">{cat.description}</td>
            <td className="py-2 px-4 border flex space-x-2">
              <button
                className="text-blue-500 flex items-center"
                onClick={() => onEdit(cat)}
              >
                <Edit size={16} className="mr-1" />
                Editar
              </button>
              <button
                className="text-red-500 flex items-center"
                onClick={() => onDelete(cat.id)}
              >
                <Trash2 size={16} className="mr-1" />
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryList;
