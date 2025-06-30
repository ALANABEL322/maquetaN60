import axios from "axios";
import { useAuthStore } from "@/store/authStore";

// 🚫 STRAPI DESHABILITADO - Lógica de autenticación comentada
// API_URL original: "http://34.238.122.213:1337/api"
export const API_URL = "http://34.238.122.213:1337/api";

// 🔐 CREDENCIALES MOCKEADAS DISPONIBLES:
// 👤 ADMIN: ADMIN123@gmail.com / ADMIN123
// 👤 USER:  user@test.com / user123

export const api = {
  async login(email: string, password: string) {
    try {
      console.log("🔐 Intentando iniciar sesión con email:", email);

      // Credenciales de administrador del sistema
      if (email === "ADMIN123@gmail.com" && password === "ADMIN123") {
        const adminUser = {
          id: "system-admin",
          email: "ADMIN123@gmail.com",
          username: "System Administrator",
          role: "admin",
        };

        useAuthStore.getState().login(adminUser.email, password);
        return { success: true, user: adminUser };
      }

      // 🔹 CREDENCIALES MOCKEADAS DE USUARIO NORMAL
      if (email === "user@test.com" && password === "user123") {
        const normalUser = {
          id: "user-normal",
          email: "user@test.com",
          username: "Usuario Normal",
          role: "user",
        };

        useAuthStore.getState().login(normalUser.email, password);
        return { success: true, user: normalUser };
      }

      // 🚫 LÓGICA DE STRAPI COMENTADA
      // const response = await axios.get(`${API_URL}/users`, {
      //   params: {
      //     "filters[email][$eq]": email,
      //   },
      // });

      // const users = response.data;
      // console.log("📡 Respuesta de la API:", users);

      // if (users && users.length > 0) {
      //   const userData = users[0];
      //   const user = {
      //     id: userData.id,
      //     email: userData.email,
      //     username: userData.username || email.split("@")[0],
      //     role: email.includes("admin") ? "admin" : "user",
      //   };
      //   console.log("✅ Usuario encontrado:", user);

      //   useAuthStore.getState().login(user.email, password);
      //   return { success: true, user };
      // } else {
      //   console.log("❌ Usuario no encontrado");
      //   return { success: false, error: "Usuario no encontrado" };
      // }

      // Si no coincide con ninguna credencial mockeada
      console.log("❌ Credenciales inválidas");
      return { success: false, error: "Credenciales inválidas" };
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
};
