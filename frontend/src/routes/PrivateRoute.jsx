// src/routes/PrivateRoute.jsx
// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
/*
export default function PrivateRoute({ role }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return <Outlet />;
}*/


export default function PrivateRoute({ allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no hay usuario logueado
  if (!user) return <Navigate to="/login" replace />;

  // Si allowedRoles está definido y el rol del usuario no está permitido
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Si todo está bien, renderizamos las rutas hijas
  return <Outlet />;
}
