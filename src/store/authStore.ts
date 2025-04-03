import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, email: string) => boolean;
  register: (email: string, username: string) => boolean;
  logout: () => void;
  users: Record<string, User & { password: string }>;
}

// Predefined admin user
const INITIAL_USERS = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: INITIAL_USERS,
      register: (email: string, username: string) => {
        const { users } = get();
        
        // Check if username or email already exists
        const userExists = Object.values(users).some(
          (u) => u.username === username || u.email === email
        );

        if (userExists) {
          return false;
        }

        const newUser = {
          id: Date.now().toString(),
          username,
          email,
          // Generar una contraseña aleatoria para el usuario
          password: Math.random().toString(36).substring(2, 15),
          role: 'user' as const,
        };

        set((state) => ({
          users: {
            ...state.users,
            [newUser.id]: newUser,
          },
        }));

        return true;
      },
      login: (username: string, password: string, email: string) => {
        const { users } = get();
        
        // Para usuarios normales, aceptar cualquier credencial
        if (username !== 'admin') {
          const existingUser = Object.values(users).find(
            (u) => u.username === username && u.role === 'user'
          );
          
          if (existingUser) {
            const { password: _, ...user } = existingUser;
            set({ user, isAuthenticated: true });
            return true;
          }
          
          // Si el usuario no existe, crear uno nuevo automáticamente
          const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: Math.random().toString(36).substring(2, 15),
            role: 'user' as const,
          };

          set((state) => ({
            users: {
              ...state.users,
              [newUser.id]: newUser,
            },
            user: newUser,
            isAuthenticated: true,
          }));
          return true;
        }

        // Para el admin, verificar las credenciales
        const adminEntry = Object.values(users).find(
          (u) => u.username === 'admin' && u.password === password
        );

        if (adminEntry) {
          const { password: _, ...user } = adminEntry;
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
