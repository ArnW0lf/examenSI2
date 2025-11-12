import React, { useState } from "react";
import { Edit, Trash, X } from "lucide-react";

export default function ProductList({ products, loading, onEdit, onDelete, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch(""); // 🔹 limpia la búsqueda y muestra todos los productos
  };

  if (loading) return <p>Cargando productos...</p>;
  if (!products || products.length === 0) return (
    <div>
      <p>No se encontraron productos.</p>
      <button onClick={handleClear} className="text-blue-600 underline mt-2">
        Ver todos los productos
      </button>
    </div>
  );

  return (
    <div>
      {/* Buscador */}
      <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Buscar
        </button>
        {query && (
          <button type="button" onClick={handleClear} className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 flex items-center">
            <X size={16} />
          </button>
        )}
      </form>

      {/* Tabla */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Categoría</th>
            <th className="border p-2 text-left">Precio Base</th>
            <th className="border p-2 text-left">Destacado</th>
            <th className="border p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category?.name}</td>
              <td className="border p-2">${product.base_price}</td>
              <td className="border p-2">{product.is_featured ? "Sí" : "No"}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="flex items-center gap-1 bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                >
                  <Edit size={16} /> Editar
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="flex items-center gap-1 bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
                >
                  <Trash size={16} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
