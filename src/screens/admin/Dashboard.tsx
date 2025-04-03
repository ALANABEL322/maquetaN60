import React from 'react';
import { useAuthStore } from '@/store/authStore';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your admin dashboard content here */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
          {/* Add statistics content */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
          {/* Add user management content */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Configuración</h2>
          {/* Add settings content */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
