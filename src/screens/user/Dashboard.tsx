import React from 'react';
import { useAuthStore } from '@/store/authStore';

const UserDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mi Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mi Perfil</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Nombre:</span> {user?.username}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
          {/* Add recent activity content */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
