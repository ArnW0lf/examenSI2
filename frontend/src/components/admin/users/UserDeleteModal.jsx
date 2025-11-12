// frontend/src/components/admin/users/UserDeleteModal.jsx
export default function UserDeleteModal({ user, onConfirm, onCancel }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">
          ¿Estás seguro que deseas eliminar al usuario <strong>{user.username}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(user.id)}
            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
