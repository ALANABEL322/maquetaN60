import React, { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, registerSchema } from './schemas';
import { useUserStore } from '@/store/useUserStore';

export interface User {
  id: number;
  username: string;
  email?: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser, logout: zustandLogout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await loginSchema.validate({ username, password });
      
      // Simulación: si el username contiene "admin", le damos rol de admin
      const role = username.toLowerCase().includes('admin') ? 'admin' as const : 'user' as const;
      
      const newUser: User = {
        id: 1,
        username,
        role
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      await registerSchema.validate({ username, email, password });
      
      const newUser: User = {
        id: 1,
        username,
        email,
        role: 'user'
      };

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    zustandLogout();
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
