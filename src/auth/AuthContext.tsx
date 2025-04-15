import React, { createContext, useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, User } from "@/store/authStore";
import { paths } from "@/routes/paths";

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    user,
    isAuthenticated,
    login: zustandLogin,
    logout: zustandLogout,
    isAdmin,
  } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [initialRedirectDone, setInitialRedirectDone] = useState(false);

  useEffect(() => {
    // Solo redirigir en el primer renderizado o cuando el estado de autenticación cambia
    if (isAuthenticated && user && !initialRedirectDone) {
      const isAuthPage = location.pathname.startsWith(paths.auth.login);
      const isAdminPath = location.pathname.startsWith(paths.admin.root);
      const isUserPath = location.pathname.startsWith(paths.user.root);

      // Solo redirigir si está en una página de auth o en la raíz
      if (isAuthPage || location.pathname === "/") {
        const targetPath =
          user.role === "admin" ? paths.admin.perfil : paths.user.landingPage;

        navigate(targetPath);
        setInitialRedirectDone(true);
      }
    }
  }, [isAuthenticated, user, navigate, location, initialRedirectDone]);

  // Restablecer el flag de redirección cuando se desautentica
  useEffect(() => {
    if (!isAuthenticated) {
      setInitialRedirectDone(false);
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const success = await zustandLogin(email, password);
    setIsLoading(false);
    return success;
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Implementa la lógica de registro aquí si es necesario
    return false; // Placeholder
  };

  const logout = () => {
    zustandLogout();
    navigate(paths.auth.login);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAdmin: isAdmin(), isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
