// frontend/src/components/admin/users/UserForm.jsx
import { useState, useEffect } from "react";

export default function UserForm({ editingUser, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    role: "customer",
    password: "",
  });

  const [generalError, setGeneralError] = useState(""); // Mensaje amigable de error

  useEffect(() => {
    setForm({
      email: editingUser?.email || "",
      username: editingUser?.username || "",
      first_name: editingUser?.first_name || "",
      last_name: editingUser?.last_name || "",
      role: editingUser?.role || "customer",
      password: "",
    });
    setGeneralError("");
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setGeneralError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form };
    if (editingUser && !data.password.trim()) delete data.password;

    try {
      setGeneralError(""); // Limpiar error previo
      await onSubmit(data);
    } catch (error) {
      if (error.response?.data) {
        const backendErrors = error.response.data;

        // Si hay error en email o username, mostramos mensaje general
        if (backendErrors.email || backendErrors.username) {
          setGeneralError("El correo o el username ya están registrados");
        }
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 space-y-4 mb-4">
      <h2 className="text-lg font-semibold">
        {editingUser ? "Editar Usuario" : "Agregar Usuario"}
      </h2>

      {generalError && (
        <p className="text-red-600 text-sm mb-2">{generalError}</p>
      )}

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 w-full rounded"
        required
      />

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="border p-2 w-full rounded"
        required
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder={editingUser ? "Nueva contraseña (opcional)" : "Contraseña"}
        className="border p-2 w-full rounded"
        required={!editingUser}
      />

      <input
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="Nombre"
        className="border p-2 w-full rounded"
      />

      <input
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Apellido"
        className="border p-2 w-full rounded"
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      >
        <option value="admin">Administrador</option>
        <option value="employee">Empleado</option>
        <option value="customer">Cliente</option>
      </select>

      <div className="flex justify-end gap-2">
        {editingUser && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingUser ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
