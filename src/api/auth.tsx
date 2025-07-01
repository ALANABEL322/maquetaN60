// import axios from "axios"; // 🚫 COMENTADO - No se usa con datos mockeados
import { useAuthStore, UserRole } from "@/store/authStore";

export const API_URL = "http://34.238.122.213:1337/api";

const MOCK_USERS = [
  {
    id: "admin-1",
    email: "admin@test.com",
    password: "admin123",
    username: "Administrador Test",
    role: "admin" as UserRole,
  },
  {
    id: "system-admin",
    email: "ADMIN123@gmail.com",
    password: "ADMIN123",
    username: "System Administrator",
    role: "admin" as UserRole,
  },

  {
    id: "user-1",
    email: "user@test.com",
    password: "user123",
    username: "Usuario Test",
    role: "user" as UserRole,
  },
];

export const api = {
  async login(email: string, password: string) {
    try {
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
        useAuthStore.getState().setAuthenticatedUser(user);
        return { success: true, user };
      }

      console.log("❌ Usuario no encontrado en datos mockeados");
      return { success: false, error: "Credenciales incorrectas" };

      // 📝 CÓDIGO STRAPI COMENTADO
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

        useAuthStore.getState().setAuthenticatedUser(user);
        return { success: true, user };
      }
      */
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
  getMockUsers() {
    return MOCK_USERS.map((user) => ({
      email: user.email,
      username: user.username,
      role: user.role,
    }));
  },
};
