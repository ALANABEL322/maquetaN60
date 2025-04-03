import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { loginSchema } from '@/auth/schemas';

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = await login(values.username, values.password);
          if (!success) {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="username">Nombre de Usuario</Label>
              <Field
                as={Input}
                type="text"
                name="username"
                id="username"
                placeholder="Ingresa tu nombre de usuario"
                className="w-full"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div className="relative">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Field
                  as={Input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
