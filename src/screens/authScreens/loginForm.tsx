import { useState, useEffect } from "react";
import { api } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { paths } from "@/routes/paths";
import { useAuthStore } from "@/store/authStore";
import { showAvailableCredentials, QUICK_LOGIN } from "@/data/mockCredentials";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🎭 Mostrar credenciales disponibles en desarrollo
  useEffect(() => {
    showAvailableCredentials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.login(email, password);
      if (response.success && response.user) {
        const userRole = response.user.role;
        console.log("🚀 Login exitoso, redirigiendo usuario:", userRole);

        // Redirección corregida por rol
        if (userRole === "admin") {
          navigate(paths.admin.perfil);
        } else {
          navigate(paths.user.landingPage);
        }
      } else {
        setError(response.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error al iniciar sesión");
    }
  };

  // 🎯 Funciones para login rápido en desarrollo
  const quickLoginAdmin = () => {
    setEmail(QUICK_LOGIN.ADMIN.email);
    setPassword(QUICK_LOGIN.ADMIN.password);
  };

  const quickLoginUser = () => {
    setEmail(QUICK_LOGIN.USER.email);
    setPassword(QUICK_LOGIN.USER.password);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu email"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="w-full pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#1a3c5b] hover:bg-[#15324c]"
        >
          Iniciar sesión
        </Button>
      </form>

      {/* 🎭 BOTONES DE LOGIN RÁPIDO PARA TESTING */}
      <div className="mt-4 space-y-2">
        <div className="text-xs text-center text-gray-500 mb-2">
          🎭 Testing rápido:
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={quickLoginAdmin}
            className="flex-1 text-xs"
          >
            👑 Admin
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={quickLoginUser}
            className="flex-1 text-xs"
          >
            👤 Usuario
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center text-sm">
        <p>
          ¿No tienes cuenta?{" "}
          <Link
            to={paths.auth.register}
            className="text-[#1a3c5b] hover:text-[#15324c] font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
