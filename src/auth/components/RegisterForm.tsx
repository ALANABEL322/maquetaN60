// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
// import Button from '@/components/ui/Button';
// import { registerSchema } from '@/auth/schemas';

// const RegisterForm: React.FC = () => {
//   const navigate = useNavigate();
//   const register = useAuthStore((state) => state.register);

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      
//       <Formik
//         initialValues={{
//           username: '',
//           email: '',
//         }}
//         validationSchema={registerSchema}
//         onSubmit={async (values, { setSubmitting }) => {
//           const success = register(values.email, values.username);
          
//           if (success) {
//             navigate('/login', { 
//               state: { 
//                 message: 'Registro exitoso. Por favor inicia sesión.' 
//               }
//             });
//           }
//           setSubmitting(false);
//         }}
//       >
//         {({ isSubmitting }) => (
//           <Form className="space-y-4">
//             <div>
//               <label className="block text-gray-700">Nombre de Usuario</label>
//               <Field
//                 type="text"
//                 name="username"
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="username"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <Field
//                 type="email"
//                 name="email"
//                 className="w-full mt-1 p-2 border rounded-md"
//               />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className="text-red-500 text-sm mt-1"
//               />
//             </div>
            
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full"
//             >
//               {isSubmitting ? 'Registrando...' : 'Registrarse'}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default RegisterForm;
