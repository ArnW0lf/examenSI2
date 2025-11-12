// frontend/src/pages/admin/Categories.jsx
import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { PlusCircle } from "lucide-react";
import CategoryList from "../../components/admin/categories/CategoryList";
import CategoryForm from "../../components/admin/categories/CategoryForm";
import CategoryDeleteModal from "../../components/admin/categories/CategoryDeleteModal";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async (categoryData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
      } else {
        await createCategory(categoryData);
      }
      setEditingCategory(null);
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteCategoryId) {
      await deleteCategory(deleteCategoryId);
      setDeleteCategoryId(null);
      fetchCategories();
    }
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Categorías</h1>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setEditingCategory(null);
              setShowForm(true);
            }}
          >
            <PlusCircle className="mr-2" size={20} />
            Nueva Categoría
          </button>
        </div>

        {showForm && (
          <CategoryForm
            editingCategory={editingCategory}
            onSave={handleSave}
          />
        )}

        {loading ? (
          <p>Cargando categorías...</p>
        ) : (
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={setDeleteCategoryId}
          />
        )}

        {deleteCategoryId && (
          <CategoryDeleteModal
            categoryId={deleteCategoryId}
            onConfirm={handleDelete}
            onCancel={() => setDeleteCategoryId(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
}
