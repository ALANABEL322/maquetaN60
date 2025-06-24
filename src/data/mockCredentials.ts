// 🎭 CREDENCIALES MOCKEADAS PARA TESTING
// Este archivo contiene todas las credenciales disponibles para pruebas

export const MOCK_CREDENTIALS = {
  // 👑 ADMINISTRADORES
  admins: [
    {
      email: "admin@test.com",
      password: "admin123",
      username: "Administrador Test",
      description: "Admin principal para testing",
    },
    {
      email: "admin2@test.com",
      password: "admin456",
      username: "Admin Secundario",
      description: "Admin secundario para testing",
    },
    {
      email: "ADMIN123@gmail.com",
      password: "ADMIN123",
      username: "System Administrator",
      description: "Admin del sistema (legacy)",
    },
  ],

  // 👤 USUARIOS NORMALES
  users: [
    {
      email: "user@test.com",
      password: "user123",
      username: "Usuario Test",
      description: "Usuario básico para testing",
    },
    {
      email: "user2@test.com",
      password: "user456",
      username: "María González",
      description: "Usuario con nombre personalizado",
    },
    {
      email: "juan@test.com",
      password: "juan123",
      username: "Juan Pérez",
      description: "Usuario con datos realistas",
    },
  ],
};

// 🚀 FUNCIÓN PARA MOSTRAR CREDENCIALES EN CONSOLA
export const showAvailableCredentials = () => {
  console.group("🎭 CREDENCIALES DISPONIBLES PARA TESTING");

  console.group("👑 ADMINISTRADORES:");
  MOCK_CREDENTIALS.admins.forEach((admin) => {
    console.log(
      `📧 ${admin.email} | 🔑 ${admin.password} | 👤 ${admin.username}`
    );
  });
  console.groupEnd();

  console.group("👤 USUARIOS:");
  MOCK_CREDENTIALS.users.forEach((user) => {
    console.log(`📧 ${user.email} | 🔑 ${user.password} | 👤 ${user.username}`);
  });
  console.groupEnd();

  console.groupEnd();
};

// 🎯 CREDENCIALES RÁPIDAS PARA COPIAR/PEGAR
export const QUICK_LOGIN = {
  ADMIN: { email: "admin@test.com", password: "admin123" },
  USER: { email: "user@test.com", password: "user123" },
};
