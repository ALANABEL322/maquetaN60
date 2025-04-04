import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Credenciales específicas para admin
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

interface User {
  id: number;
  username: string;
  email?: string;
  role: 'admin' | 'user';
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        try {
          // Verificar credenciales de admin
          if (
            username === ADMIN_CREDENTIALS.username &&
            password === ADMIN_CREDENTIALS.password
          ) {
            set({
              user: {
                id: 1,
                username,
                role: 'admin'
              },
              isAuthenticated: true,
            });
            return true;
          }

          // Para usuarios normales, cualquier username que no sea "admin" es válido
          if (username.toLowerCase() !== 'admin') {
            set({
              user: {
                id: 2,
                username,
                role: 'user'
              },
              isAuthenticated: true,
            });
            return true;
          }

          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          // No permitir registro de usuarios con username "admin"
          if (username.toLowerCase() === 'admin') {
            return false;
          }

          set({
            user: {
              id: 2,
              username,
              email,
              role: 'user'
            },
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      isAdmin: (): boolean => {
        const state = useAuthStore.getState();
        return state.user?.role === 'admin';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
