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
  register: (email: string, username: string, password: string) => boolean;
  logout: () => void;
  users: Record<string, User & { password: string }>;
}

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
      register: (email: string, username: string, password: string) => {
        const { users } = get();
        
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
          password,
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
        
        const existingUser = Object.values(users).find(
          (u) => u.username === username && u.password === password
        );
        
        if (!existingUser) {
          return false;
        }

        set({
          user: existingUser,
          isAuthenticated: true,
        });

        return true;
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
