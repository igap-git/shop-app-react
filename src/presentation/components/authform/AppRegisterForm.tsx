import AuthForm from './AuthForm';
import type { User } from '../../../domain/types/user';
import { useRouter } from '@tanstack/react-router';

export function AppRegisterForm() {
  const router = useRouter();
  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('https://dummyjson.com/http/200', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const savedUsers = localStorage.getItem('users');
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      const userExists = users.some((user) => user.email === data.email);

      if (userExists) {
        alert('User already exists');
        return;
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email: data.email,
        password: data.password,
        cart: [],
        favorites: [],
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      router.navigate({ to: '/' });
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <AuthForm type="register" onSubmit={handleSubmit} />
    </section>
  );
}
