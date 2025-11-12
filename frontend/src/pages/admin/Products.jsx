import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { PlusCircle } from "lucide-react";

// Componentes separados del CRUD
import ProductList from "../../components/admin/products/ProductList";
import ProductForm from "../../components/admin/products/ProductForm";
import ProductDeleteModal from "../../components/admin/products/ProductDeleteModal";

// Servicios
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // 🔹 Para el buscador
  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Para paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (query = "", pageNumber = 1) => {
    try {
      setLoading(true);
      const data = await getProducts({ search: query, page: pageNumber });
      setProducts(data.results || data);
      setTotalPages(data.total_pages || 1); // si tu API devuelve total_pages
      setPage(pageNumber);
    } catch (error) {
      console.error("Error al cargar productos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchQuery, page);
  }, []);

  // 🔹 Maneja búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProducts(query, 1); // cada búsqueda inicia desde la página 1
  };

  // 🔹 Crear o editar producto
  const handleCreateOrEdit = (product) => {
    setEditingProduct(product || null);
    setModalOpen(true);
  };

  // 🔹 Eliminar producto
  const handleDelete = (product) => {
    setDeletingProduct(product);
    setDeleteModalOpen(true);
  };

  // 🔹 Cambiar página
  const handlePageChange = (newPage) => {
    fetchProducts(searchQuery, newPage);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Productos
        </h1>
        <button
          onClick={() => handleCreateOrEdit(null)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Nuevo producto
        </button>
      </div>

      {/* Listado de productos con buscador integrado */}
      <ProductList
        products={products}
        loading={loading}
        onEdit={handleCreateOrEdit}
        onDelete={handleDelete}
        onSearch={handleSearch} // 🔹 Pasa función de búsqueda
      />

      {/* Paginación simple */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal de Crear / Editar */}
      {modalOpen && (
        <ProductForm
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            fetchProducts(searchQuery, page);
            setModalOpen(false);
          }}
        />
      )}

      {/* Modal de Eliminación */}
      {deleteModalOpen && (
        <ProductDeleteModal
          product={deletingProduct}
          onClose={() => setDeleteModalOpen(false)}
          onSuccess={() => {
            fetchProducts(searchQuery, page);
            setDeleteModalOpen(false);
          }}
        />
      )}
    </AdminLayout>
  );
}
