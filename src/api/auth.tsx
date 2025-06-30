import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// 🚫 STRAPI DESHABILITADO - Lógica de autenticación comentada
// API_URL original: "http://34.238.122.213:1337/api"
export const API_URL = "http://34.238.122.213:1337/api";

// 🔐 CREDENCIALES MOCKEADAS DISPONIBLES:
// 👤 ADMIN: ADMIN123@gmail.com / ADMIN123
// 👤 USER:  user@test.com / user123

// 🎭 DATOS MOCKEADOS PARA TESTING
const MOCK_USERS = [
  // Usuarios Admin
  {
    id: "admin-1",
    email: "admin@test.com",
    password: "admin123",
    username: "Administrador Test",
    role: "admin",
  },
  {
    id: "admin-2",
    email: "admin2@test.com",
    password: "admin456",
    username: "Admin Secundario",
    role: "admin",
  },
  // Usuarios normales
  {
    id: "user-1",
    email: "user@test.com",
    password: "user123",
    username: "Usuario Test",
    role: "user",
  },
  {
    id: "user-2",
    email: "user2@test.com",
    password: "user456",
    username: "María González",
    role: "user",
  },
  {
    id: "user-3",
    email: "juan@test.com",
    password: "juan123",
    username: "Juan Pérez",
    role: "user",
  },
  // Admin del sistema (mantener para compatibilidad)
  {
    id: "system-admin",
    email: "ADMIN123@gmail.com",
    password: "ADMIN123",
    username: "System Administrator",
    role: "admin",
  },
];

export const api = {
  async login(email: string, password: string) {
    try {
      console.log("🔐 Intentando iniciar sesión con email:", email);

      // 🎭 USAR DATOS MOCKEADOS EN LUGAR DE STRAPI
      console.log("🎯 Usando autenticación con datos mockeados...");

      // Buscar usuario en datos mockeados
      const mockUser = MOCK_USERS.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (mockUser) {
        const user = {
          id: mockUser.id,
          email: mockUser.email,
          username: mockUser.username,
          role: mockUser.role,
        };

        console.log("✅ Usuario mockeado encontrado:", user);
        useAuthStore.getState().setAuthenticatedUser(user);
        return { success: true, user };
      }

      // 📝 CÓDIGO STRAPI COMENTADO PARA REFERENCIA
      /*
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          "filters[email][$eq]": email,
        },
      });

      const users = response.data;
      console.log("📡 Respuesta de la API:", users);

      if (users && users.length > 0) {
        const userData = users[0];
        const user = {
          id: userData.id,
          email: userData.email,
          username: userData.username || email.split("@")[0],
          role: email.includes("admin") ? "admin" : "user",
        };
        console.log("✅ Usuario encontrado:", user);

        useAuthStore.getState().login(user.email, password);
        return { success: true, user };
      }
      */

      console.log("❌ Usuario no encontrado en datos mockeados");
      return { success: false, error: "Credenciales incorrectas" };
    } catch (error) {
      console.error("❌ Error en login:", error);
      return { success: false, error: "Error al intentar iniciar sesión" };
    }
  },

  async registerLocal(userData: {
    email: string;
    password: string;
    username: string;
    role: "user";
  }) {
    try {
      const newUser = useAuthStore.getState().registerLocalUser(userData);
      return {
        success: true,
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        error: "Error al registrar el usuario localmente",
      };
    }
  },

  // 🎭 FUNCIÓN AUXILIAR PARA OBTENER USUARIOS MOCKEADOS (para debugging)
  getMockUsers() {
    return MOCK_USERS.map((user) => ({
      email: user.email,
      username: user.username,
      role: user.role,
    }));
  },
};
