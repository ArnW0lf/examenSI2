// frontend/src/components/admin/users/UserList.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function UserList({ users, onEdit, onDelete }) {
  if (!users.length) return <p>No hay usuarios registrados.</p>;

  return (
    <table className="w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Username</th>
          <th className="p-2 border">Nombre</th>
          <th className="p-2 border">Apellido</th>
          <th className="p-2 border">Rol</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.id}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">{user.username}</td>
            <td className="p-2 border">{user.first_name}</td>
            <td className="p-2 border">{user.last_name}</td>
            <td className="p-2 border">{user.role}</td>
            <td className="p-2 border flex gap-2 justify-center">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(user)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
