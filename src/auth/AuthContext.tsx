import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema, registerSchema } from './schemas';

interface AuthContextType {
  user: any | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const _isValid = await loginSchema.validate({ username, password });
      const user = {
        id: 1,
        username,
        email: 'user@example.com',
        token: 'fake-token-' + Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
    
      const _isValid = await registerSchema.validate({ username, email, password });
      
      const user = {
        id: 1,
        username,
        email,
        token: 'fake-token-' + Date.now()
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/dashboard');
      return true;
    } catch (error) {
      console.error('Error al registrarse:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
