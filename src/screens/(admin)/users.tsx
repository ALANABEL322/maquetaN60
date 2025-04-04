import { User } from '@/auth/AuthContext';
import { DataTable } from '@/components/ui/data-table';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Aquí iría la llamada a la API para obtener usuarios
    const mockUsers: User[] = [
      {
        id: 1,
        username: 'john_doe',
        email: 'john@example.com',
        role: 'user',
      },
      {
        id: 2,
        username: 'admin_user',
        email: 'admin@example.com',
        role: 'admin',
      },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      <DataTable  data={users} columns={[]} />
    </div>
  );
}
