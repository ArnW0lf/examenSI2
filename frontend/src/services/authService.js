// src/services/authService.js
// src/services/authService.js
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL; 
const api = axios.create({ baseURL: API_URL });

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, {
      email,    // ⚠ email en vez de username
      password,
    });
    const { access, refresh, role, email: userEmail } = response.data;
    // Guardar tokens y payload
    /*
    const { access, refresh } = response.data;
    const payload = JSON.parse(atob(access.split('.')[1])); // decodifica JWT

    // Guardar solo la info que necesitas para redirección
    const user = {
      id: payload.user_id,
      email: payload.email,
      role: payload.role
    };*/
    const user = { email: userEmail, role }; // guardamos solo lo necesario

    // Guardar en localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    return user;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Error al iniciar sesión");
  }
};


/*
export async function fakeLogin(email, password) {
  // Simulación de un "delay" como si fuera una llamada real al servidor
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Usuarios simulados
  const users = [
    {
      email: "admin@gmail.com",
      password: "1234",
      role: "admin",
      name: "Administrador",
    },
    {
      email: "cliente@gmail.com",
      password: "1234",
      role: "cliente",
      name: "Cliente Ejemplo",
    },
  ];

  // Buscar el usuario
  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return foundUser;
}*/
