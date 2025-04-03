import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/ui/Button';
import { loginSchema } from '@/auth/schemas';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      <Formik
        initialValues={{
          username: '',
          password: '',
          showPassword: false
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const success = login(values.username, values.password, '');
          
          if (success) {
            navigate('/dashboard');
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre de Usuario</label>
              <Field
                type="text"
                name="username"
                className="w-full mt-1 p-2 border rounded-md"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            
            <div className="relative">
              <label className="block text-gray-700">Contraseña</label>
              <div className="relative">
                <Field
                  type={values.showPassword ? 'text' : 'password'}
                  name="password"
                  className="w-full mt-1 p-2 border rounded-md pr-10"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setFieldValue('showPassword', !values.showPassword)}
                >
                  {values.showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
