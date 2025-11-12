// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Shop from "../pages/public/Shop";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Products from "../pages/admin/Products";
import Categories from "../pages/admin/Categories";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";

export default function AppRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />

      
        <Route element={<PrivateRoute allowedRoles={['admin', 'employee']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/reports" element={<Reports />} />
        </Route>

        {/* Rutas privadas para ADMIN */}
        
      </Routes>


      

    
    </BrowserRouter>
  );
}
