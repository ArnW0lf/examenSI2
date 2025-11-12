// frontend/src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getUsers, createUser, updateUser, deleteUser } from "../../services/userService";
import UserList from "../../components/admin/users/UserList";
import UserForm from "../../components/admin/users/UserForm";
import UserDeleteModal from "../../components/admin/users/UserDeleteModal";
import { PlusCircle } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (editingUser && editingUser.id) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      setShowForm(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al guardar usuario:", error.response?.data || error);
      // Re-lanzamos para que UserForm pueda mostrarlo
      throw error;
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setDeletingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error.response?.data || error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={() => { setEditingUser(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle size={20} /> Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <UserForm
          editingUser={editingUser}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditingUser(null); }}
        />
      )}

      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={setDeletingUser}
      />

      <UserDeleteModal
        user={deletingUser}
        onConfirm={handleDelete}
        onCancel={() => setDeletingUser(null)}
      />
    </AdminLayout>
  );
}
