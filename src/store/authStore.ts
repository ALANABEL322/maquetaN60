import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Predefined users (in a real app, this would be in a database)
const USERS = {
  admin: {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin' as const,
  },
  user: {
    id: '2',
    username: 'user',
    password: 'user123',
    role: 'user' as const,
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (username: string, password: string) => {
        const userEntry = Object.values(USERS).find(
          (u) => u.username === username && u.password === password
        )

        if (userEntry) {
          const { password: _, ...user } = userEntry
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
